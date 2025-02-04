import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      shippingAddress: true,
    },
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid key={order.id} size={{ xs: 12 }}>
            <Link href={`/orders/${order.id}`} passHref>
              <Paper
                sx={{
                  p: 3,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">
                    Order #{order.id.slice(-6)}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "PENDING" ? "warning" : "success"}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6">
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.length} items
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shipping to: {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}
                  </Typography>
                </Box>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
