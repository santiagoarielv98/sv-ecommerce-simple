import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function getOrders() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  return prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      shippingAddress: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getOrder(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      shippingAddress: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (order?.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  return order;
}
