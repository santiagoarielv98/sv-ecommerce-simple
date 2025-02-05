"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxStock: number;
}

function QuantitySelector({
  quantity,
  onQuantityChange,
  maxStock,
}: QuantitySelectorProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton
        size="small"
        onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton
        size="small"
        onClick={() => quantity < maxStock && onQuantityChange(quantity + 1)}
        disabled={quantity >= maxStock}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

export default QuantitySelector;
