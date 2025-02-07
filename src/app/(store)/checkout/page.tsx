import { EmptyCart } from "@/components/cart/empty-cart";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, Product } from "@prisma/client";
import AddressForm from "./_components/address-form";
import OrderSummary from "@/components/order/order-summary";

const items = [
  {
    id: "1",
    product: { id: "1", name: "Product 1", price: 10 },
    quantity: 1,
  } as OrderItem & { product: Product },
  {
    id: "2",
    product: { id: "2", name: "Product 2", price: 20 },
    quantity: 2,
  } as OrderItem & { product: Product },
];

export default async function CheckoutPage() {
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container sx={{ my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {false && (
          <Alert severity="error" sx={{ mb: 2 }}>
            This is a demo store — no orders shall be fulfilled.
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <AddressForm />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <OrderSummary
              order={
                { items } as Order & {
                  items: Array<OrderItem & { product: Product }>;
                }
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
