import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { OrderItem, Product } from "@prisma/client";

export interface OrderSummaryProps {
  items: Array<OrderItem & { product: Product }>;
}

const OrderSummary = ({ items = [] }: OrderSummaryProps) => {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
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
  );
};

export default OrderSummary;
