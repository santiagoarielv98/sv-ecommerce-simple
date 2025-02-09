"use client";

import { EmptyCart } from "@/components/cart/empty-cart";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, Product } from "@prisma/client";
import AddressForm from "./_components/address-form";
import OrderSummary from "@/components/order/order-summary";
import { useCart } from "@/contexts/cart-context";

export default function CheckoutPage() {
  const { items } = useCart();
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
