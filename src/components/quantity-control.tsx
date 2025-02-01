"use client";

import { IconButton, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange: (quantity: number) => void;
  size?: "small" | "medium";
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
  size = "medium",
}: QuantityControlProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={onDecrease} size={size} color="primary">
        <RemoveIcon />
      </IconButton>
      <TextField
        size={size}
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            onQuantityChange(value);
          }
        }}
        slotProps={{
          htmlInput: {
            min: 1,
            style: { textAlign: "center" },
          },
        }}
        sx={{ width: 60 }}
      />
      <IconButton onClick={onIncrease} size={size} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
}
