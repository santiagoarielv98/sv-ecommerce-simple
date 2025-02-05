"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { OrderItem, Product } from "@prisma/client";

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

export default function CheckoutPage() {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Alert severity="error" sx={{ mb: 2 }}>
        This is a demo store — no orders shall be fulfilled.
      </Alert>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box component="form">
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="First Name" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Last Name" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Address Line 1" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Address Line 2" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="City" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="State" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Zip / Postal Code" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Country" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Place Order
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
