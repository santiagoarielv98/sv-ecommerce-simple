"use client";

import { useCart } from "@/hooks/use-cart";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CartRowItem from "./cart-row-item";
import CartTotal from "./cart-total";

export default function CartTable() {
  const { getTotalPrice, items, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
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
            <CartRowItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onDelete={() => removeFromCart(item.product.id)}
              onChangeQuantity={(newQuantity) =>
                handleQuantityChange(item.product.id, newQuantity)
              }
            />
          ))}
          <CartTotal total={getTotalPrice()} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
