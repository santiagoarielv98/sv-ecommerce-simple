"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, Product } from "@prisma/client";

export interface OrderDetailsProps {
  order: Order & { items: Array<OrderItem & { product: Product }> };
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>
      <Chip
        label={order.status}
        color={order.status === "PENDING" ? "warning" : "success"}
        sx={{ mb: 2 }}
      />
      {order.items.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography>
            {item.product.name} x {item.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default OrderDetails;
