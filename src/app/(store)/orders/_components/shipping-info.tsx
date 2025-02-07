import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { ShippingAddress } from "@prisma/client";

export interface ShippingInfoProps {
  shippingAddress: ShippingAddress;
}

const ShippingInfo = ({ shippingAddress }: ShippingInfoProps) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Typography>{shippingAddress?.address}</Typography>
      <Typography>
        {shippingAddress?.city}, {shippingAddress?.postalCode}
      </Typography>
      <Typography>{shippingAddress?.country}</Typography>
    </Paper>
  );
};

export default ShippingInfo;
