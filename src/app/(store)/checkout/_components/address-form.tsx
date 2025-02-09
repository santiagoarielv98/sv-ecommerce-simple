"use client";

import AlertDemoCredentials from "@/components/demo/alert-demo-credentials";
import type { CheckoutFormData } from "@/lib/schemas/checkout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";

export interface AddressFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                error={Boolean(errors.firstName)}
                {...register("firstName")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                error={Boolean(errors.lastName)}
                {...register("lastName")}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address Line 1"
                error={Boolean(errors.address1)}
                {...register("address1")}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address Line 2"
                error={Boolean(errors.address2)}
                {...register("address2")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="City"
                error={Boolean(errors.city)}
                {...register("city")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="State"
                error={Boolean(errors.state)}
                {...register("state")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Zip / Postal Code"
                error={Boolean(errors.zip)}
                {...register("zip")}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Country"
                error={Boolean(errors.country)}
                {...register("country")}
              />
            </Grid>
            {/* <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Use this address for payment details"
              />
            </Grid> */}
          </Grid>
          <AlertDemoCredentials />

          <Button type="submit" variant="contained" fullWidth size="large">
            Place Order
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
