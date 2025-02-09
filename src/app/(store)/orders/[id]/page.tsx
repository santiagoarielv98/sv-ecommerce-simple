import OrderSummary from "@/components/order/order-summary";
import { getOrder } from "@/lib/db/order";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import OrderDetails from "../_components/order-details";
import ShippingInfo from "../_components/shipping-info";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <OrderDetails order={order} />
            {order.shippingAddress && (
              <ShippingInfo shippingAddress={order.shippingAddress} />
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary disableProducts order={order} />
        </Grid>
      </Grid>
    </Container>
  );
}
