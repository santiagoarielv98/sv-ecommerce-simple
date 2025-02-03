import HideImageIcon from "@mui/icons-material/HideImage";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { Product } from "@prisma/client";
import StockBadge from "./stock-badge";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (e: React.MouseEvent) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {product.images.length > 0 && (
        <Avatar
          variant="square"
          src={product.images[0]}
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            position: "relative",
            height: "auto",
            overflow: "hidden",
          }}
        >
          <HideImageIcon />
        </Avatar>
      )}
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price.toFixed(2)}</Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <StockBadge stock={product.stock} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={product.stock === 0}
          sx={{ mt: 2 }}
          onClick={onAddToCart}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
