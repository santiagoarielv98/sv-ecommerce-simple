import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Button from "@mui/material/Button";
import Link from "next/link";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, shippingAddress: true },
  });

  if (!order) {
    notFound();
  }

  // Transform the data to match the expected format
  const transformedOrder = {
    ...order,
    shippingAddress: order.shippingAddress,
    items: order.items.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
      },
    })),
  };

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
              label={transformedOrder.status}
              color={
                transformedOrder.status === "PENDING" ? "warning" : "success"
              }
              sx={{ mb: 2 }}
            />
            {transformedOrder.items.map((item) => (
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
            <Typography>{transformedOrder.shippingAddress?.address}</Typography>
            <Typography>
              {transformedOrder.shippingAddress?.city},{" "}
              {transformedOrder.shippingAddress?.postalCode}
            </Typography>
            <Typography>{transformedOrder.shippingAddress?.country}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="h6">
                Total: ${transformedOrder.total.toFixed(2)}
              </Typography>

              {transformedOrder.status === "PENDING" &&
              transformedOrder.paymentUrl ? (
                <Button
                  component={Link}
                  href={transformedOrder.paymentUrl}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Pay Now
                </Button>
              ) : transformedOrder.paymentId ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment ID: {transformedOrder.paymentId}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
