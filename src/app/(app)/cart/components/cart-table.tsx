"use client";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { OrderItem, Product } from "@prisma/client";
import { CartItem } from "./cart-item";
import { CartTotal } from "./cart-total";

export interface CartTableProps {
  items: Array<OrderItem & { product: Product }>;
}

export default function CartTable({ items }: CartTableProps) {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onQuantityChange={(quantity) => console.log(quantity)}
              onDelete={() => console.log("delete")}
            />
          ))}
          <CartTotal total={total} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
