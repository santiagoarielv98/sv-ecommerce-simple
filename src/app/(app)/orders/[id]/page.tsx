import OrderSummary from "@/components/order/order-summary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type {
  Order,
  OrderItem,
  Product,
  ShippingAddress,
} from "@prisma/client";
import { notFound } from "next/navigation";
import OrderDetails from "../_components/order-details";
import ShippingInfo from "../_components/shipping-info";

const order = {
  id: "1",
  status: "PENDING",
  total: 100,
  shippingAddress: {
    address: "123 Fake St",
    city: "Springfield",
    postalCode: "12345",
    country: "USA",
  },
  items: [
    {
      id: "1",
      price: 50,
      quantity: 1,
      product: {
        id: "1",
        name: "Product 1",
        price: 50,
      },
    },
    {
      id: "2",
      price: 50,
      quantity: 1,
      product: {
        id: "2",
        name: "Product 2",
        price: 50,
      },
    },
  ],
  paymentId: "abc123",
  paymentUrl: "https://example.com",
} as unknown as Order & {
  shippingAddress: ShippingAddress;
  items: Array<OrderItem & { product: Product }>;
};

export default async function OrderPage() {
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
            <ShippingInfo shippingAddress={order.shippingAddress} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary
            disableProducts
            order={
              order as unknown as Order & {
                items: Array<OrderItem & { product: Product }>;
              }
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
