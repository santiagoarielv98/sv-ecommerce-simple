"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { CartItem } from "@/contexts/cart-context";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
