"use client";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, ShippingAddress } from "@prisma/client";

export interface OrderCardProps {
  order: Order & {
    items: OrderItem[];
  } & {
    shippingAddress: ShippingAddress;
  };
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="h6">Order #{order.id.slice(-6)}</Typography>
        <Chip
          label={order.status}
          color={order.status === "PENDING" ? "warning" : "success"}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="body2" color="text.secondary">
          {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="h6">${order.total.toFixed(2)}</Typography>
      </Stack>
      <Stack>
        <Typography variant="body2" color="text.secondary">
          {order.items.length} items
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Shipping to: {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.country}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default OrderCard;
