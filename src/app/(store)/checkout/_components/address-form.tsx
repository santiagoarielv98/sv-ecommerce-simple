import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AddressForm() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form">
        <Stack spacing={2}>
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

          <Button type="submit" variant="contained" fullWidth size="large">
            Place Order
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
