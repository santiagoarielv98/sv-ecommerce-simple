"use server";

import { CART_LIMITS } from "@/config/cart";
import { auth } from "@/lib/auth";
import mercadopago from "@/lib/mercado-pago";
import { prisma } from "@/lib/prisma";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import type { CartItem } from "@/types/cart";
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

    // Verificar stock y cantidad máxima
    const productsToCheck = await prisma.product.findMany({
      where: {
        id: {
          in: cartItems.map((item) => item.product.id),
        },
      },
    });

    for (const item of cartItems) {
      const product = productsToCheck.find((p) => p.id === item.product.id);

      if (!product) {
        throw new Error(`Product ${item.product.name} is no longer available`);
      }

      if (item.quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM) {
        throw new Error(
          `Maximum ${CART_LIMITS.MAX_QUANTITY_PER_ITEM} items allowed per product`,
        );
      }

      if (item.quantity > product.stock) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
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
        paymentUrl: preference.init_point!,
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
