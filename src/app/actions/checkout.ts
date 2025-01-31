"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { CartItem } from "@/contexts/cart-context";
import { z } from "zod";

export async function createOrder(
  cartItems: CartItem[],
  formData: CheckoutFormData,
) {
  console.log(formData);
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
        shippingAddress: {
          create: validatedData,
        },
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    revalidatePath("/orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Checkout error:", error);
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw new Error("Failed to process order");
  }
}
