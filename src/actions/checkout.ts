"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { CartItem } from "@/contexts/cart-context";
import { z } from "zod";
import client from "@/lib/client";
import { ObjectId } from "mongodb";

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
    const db = (await client).db();

    const order = await db.collection("orders").insertOne({
      userId: session.user.id,
      status: "PENDING",
      total: cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      createdAt: new Date(),
      items: cartItems.map((item) => ({
        productId: new ObjectId(item.product.id),
        quantity: item.quantity,
        price: item.product.price,
      })),
    });

    await db.collection("shippingAddresses").insertOne({
      ...validatedData,
      orderId: order.insertedId,
    });

    revalidatePath("/orders");
    return { success: true, orderId: order.insertedId.toString() };
  } catch (error) {
    console.error("Checkout error:", error);
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw new Error("Failed to process order");
  }
}
