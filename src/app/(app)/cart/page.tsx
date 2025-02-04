"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/hooks/use-cart";
import QuantityControl from "@/components/quantity-control";

export default function CartPage() {
  const {
    items,
    removeItem,
    total,
    incrementItem,
    decrementItem,
    updateQuantity,
  } = useCart();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align="right">
                  ${item.product.price.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrease={() => incrementItem(item.product.id)}
                    onDecrease={() => decrementItem(item.product.id)}
                    onQuantityChange={(q) => updateQuantity(item.product.id, q)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => removeItem(item.product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        href="/checkout"
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
}
