"use server";

import { CartItem } from "@/contexts/cart-context";
import { auth } from "@/lib/auth";
import mercadopago from "@/lib/mercado-pago";
import { prisma } from "@/lib/prisma";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { Preference } from "mercadopago";
import { z } from "zod";

export async function createOrder(
  cartItems: CartItem[],
  formData: CheckoutFormData,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Authentication required");
    }

    const validatedData = checkoutSchema.parse(formData);

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        total: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
        items: {
          createMany: {
            data: cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        shippingAddress: {
          create: validatedData,
        },
      },
    });

    const preference = await new Preference(mercadopago).create({
      body: {
        items: cartItems.map((item) => ({
          id: item.product.id,
          title: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
          picture_url: item.product.images[0],
        })),
        metadata: {
          order_id: order.id,
        },
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentUrl: preference.init_point,
      },
    });

    return { success: true, initPoint: preference.init_point! };
  } catch (error) {
    console.error("Checkout error:", error);
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw new Error("Failed to process order");
  }
}
