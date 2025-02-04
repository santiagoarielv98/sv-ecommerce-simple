import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HideImageIcon from "@mui/icons-material/HideImage";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { Product } from "@prisma/client";
interface ProductCardProps {
  product: Product;
  onAddToCart?: (e: React.MouseEvent, product: Product) => void;
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        {/* <Rating value={product.rating} precision={0.5} readOnly /> */}
      </CardContent>
      <CardActions>
        <IconButton
          color={product.stock === 0 ? "default" : "primary"}
          onClick={(e) => onAddToCart?.(e, product)}
          disabled={product.stock === 0}
        >
          <AddShoppingCartIcon />
        </IconButton>
        {/* <IconButton color="primary">
          <FavoriteBorderIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
