import Chip from "@mui/material/Chip";

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return <Chip label="Out of Stock" color="error" size="small" />;
  }
  if (stock <= 5) {
    return <Chip label={`Only ${stock} left`} color="warning" size="small" />;
  }
  return null;
}
