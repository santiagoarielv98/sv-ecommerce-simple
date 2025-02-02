import mercadopago from "@/lib/mercado-pago";
import { prisma } from "@/lib/prisma";
import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body: { data: { id: string } } = await request.json();

  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  if (payment.status === "approved") {
    const orderId = payment.metadata.order_id as string;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "PROCESSING",
          paymentId: payment.id!.toString(),
        },
      });

      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    });

    revalidatePath("/");
  }

  return new Response(null, { status: 200 });
}
