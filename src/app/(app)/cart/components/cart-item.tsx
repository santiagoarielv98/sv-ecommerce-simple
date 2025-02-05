import QuantitySelector from "@/components/products/quantity-selector";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Product } from "@prisma/client";

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

export function CartItem({
  product,
  quantity,
  onQuantityChange,
  onDelete,
}: CartItemProps) {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
      <TableCell align="right">
        <Stack alignItems="end">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            maxStock={10}
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
