"use client";

import { useCart } from "@/contexts/cart-context";
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
  const { total, items, removeItem, addToCart } = useCart();

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
              onQuantityChange={(quantity) => addToCart(item.product, quantity)}
              onDelete={() => removeItem(item.product.id)}
            />
          ))}
          <CartTotal total={total} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
