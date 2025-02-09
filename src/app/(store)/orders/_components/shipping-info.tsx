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
      <Typography>
        {shippingAddress?.firstName} {shippingAddress?.lastName}
      </Typography>
      <Typography>{shippingAddress?.address1}</Typography>
      {shippingAddress?.address2 && (
        <Typography>{shippingAddress.address2}</Typography>
      )}
      <Typography>
        {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zip}
      </Typography>
      <Typography>{shippingAddress?.country}</Typography>
    </Paper>
  );
};

export default ShippingInfo;
