"use client";

import { EmptyCart } from "@/components/cart/empty-cart";
import OrderSummary from "@/components/order/order-summary";
import { useCart } from "@/hooks/use-cart";
import { createOrder } from "@/lib/db/checkout";
import type { CheckoutFormData } from "@/lib/schemas/checkout";
import { checkoutSchema } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import AddressForm from "./_components/address-form";
import { DEMO_SHIPPING_ADDRESS } from "@/config/demo";

export default function CheckoutPage() {
  const router = useRouter();
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: DEMO_SHIPPING_ADDRESS,
  });

  const { items, clearCart } = useCart();
  if (items.length === 0) {
    return <EmptyCart />;
  }

  const handleSubmit = async (data: CheckoutFormData) => {
    try {
      const result = await createOrder(items, data);
      if (result.success) {
        router.push(result.initPoint);
        clearCart();
      }
    } catch {}
  };

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
            <FormProvider {...methods}>
              <AddressForm onSubmit={handleSubmit} />
            </FormProvider>
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
