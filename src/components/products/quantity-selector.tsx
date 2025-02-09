"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CART_LIMITS } from "@/config/cart";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function QuantitySelector({
  quantity,
  onChange,
  min = CART_LIMITS.MIN_QUANTITY,
  max = CART_LIMITS.MAX_QUANTITY_PER_ITEM,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} width="fit-content">
      <IconButton
        size="small"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton
        size="small"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

export default QuantitySelector;
