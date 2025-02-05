import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Order, OrderItem, Product } from "@prisma/client";
import Link from "next/link";

export interface OrderSummaryProps {
  order: Order & { items: Array<OrderItem & { product: Product }> };
  // opcion para no mostrar los productos
  disableProducts?: boolean;
}

const OrderSummary = ({ order, disableProducts }: OrderSummaryProps) => {
  const items = order.items || [];

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {!disableProducts &&
        items.map((item) => (
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
        {order.status === "PENDING" && order.paymentUrl ? (
          <Button
            component={Link}
            href={order.paymentUrl}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Pay Now
          </Button>
        ) : order.paymentId ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Payment ID: {order.paymentId}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
};

export default OrderSummary;
