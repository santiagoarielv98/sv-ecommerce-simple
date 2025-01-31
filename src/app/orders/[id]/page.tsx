import { prisma } from "@/lib/prisma";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      shippingAddress: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            <Chip
              label={order.status}
              color={order.status === "PENDING" ? "warning" : "success"}
              sx={{ mb: 2 }}
            />
            {order.items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography>
                  {item.product.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>{order.shippingAddress?.address}</Typography>
            <Typography>
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
            </Typography>
            <Typography>{order.shippingAddress?.country}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="h6">
                Total: ${order.total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
