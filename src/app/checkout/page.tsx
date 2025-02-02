"use client";

import { createOrder } from "@/actions/checkout";
import { useCart } from "@/contexts/cart-context";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
  }, [session, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await createOrder(items, data);
      if (result.success) {
        clearCart();
        router.push(result.initPoint);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Your cart is empty</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...register("address")}
                    fullWidth
                    label="Address"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register("city")}
                    fullWidth
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register("postalCode")}
                    fullWidth
                    label="Postal Code"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...register("country")}
                    fullWidth
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {items.map((item) => (
              <Box key={item.product.id} sx={{ mb: 2 }}>
                <Typography>
                  {item.product.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
