"use client";

import { getStatusColor } from "@/utils/order";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type {
  Order,
  OrderItem,
  Product,
  ShippingAddress,
} from "@prisma/client";

export interface OrderCardProps {
  order: Order & {
    items: Array<OrderItem & { product: Product }>;
  } & {
    shippingAddress: ShippingAddress | null;
  };
}

const OrderCard = ({ order }: OrderCardProps) => {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Paper
      sx={{
        p: 3,
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Order #{order.id.slice(-6)}</Typography>
          <Chip label={order.status} color={getStatusColor(order.status)} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
          <Typography variant="h6" color="primary">
            ${order.total.toFixed(2)}
          </Typography>
        </Stack>

        {order.shippingAddress && (
          <Typography variant="body2" color="text.secondary" noWrap>
            Shipping to: {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default OrderCard;
