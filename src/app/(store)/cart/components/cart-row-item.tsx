"use client";

import QuantitySelector from "@/components/products/quantity-selector";
import { CART_LIMITS } from "@/config/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Product } from "@prisma/client";

export interface CartItemProps {
  product: Product;
  quantity: number;
  onDelete: () => void;
  onChangeQuantity: (newQuantity: number) => void;
}

export default function CartRowItem({
  product,
  quantity,
  onDelete,
  onChangeQuantity,
}: CartItemProps) {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
      <TableCell align="right">
        <Stack alignItems="end">
          <QuantitySelector
            quantity={quantity}
            onChange={onChangeQuantity}
            max={Math.min(product.stock, CART_LIMITS.MAX_QUANTITY_PER_ITEM)}
          />
        </Stack>
      </TableCell>
      <TableCell align="right">
        ${(product.price * quantity).toFixed(2)}
      </TableCell>
      <TableCell align="right">
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
