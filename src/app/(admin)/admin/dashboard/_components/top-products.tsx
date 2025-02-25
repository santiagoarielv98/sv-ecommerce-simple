import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";

interface TopProduct {
  id: string;
  name: string;
  totalSold: number;
  images: string[];
}

interface TopProductsProps {
  products: TopProduct[];
}

const TopProducts = ({ products }: TopProductsProps) => {
  return (
    <Paper sx={{ p: 2, height: "340px", overflow: "hidden" }} component={Stack}>
      <Typography variant="h6" gutterBottom>
        Top Products
      </Typography>
      <List sx={{ overflow: "auto", height: "100%" }}>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar src={product.images[0] || "/placeholder.png"} />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`${product.totalSold} ventas`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopProducts;
