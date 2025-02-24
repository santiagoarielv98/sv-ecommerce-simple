import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const topProducts = [
  { name: "Producto 1", sales: 150, image: "/product1.jpg" },
  { name: "Producto 2", sales: 120, image: "/product2.jpg" },
  { name: "Producto 3", sales: 100, image: "/product3.jpg" },
  { name: "Producto 4", sales: 90, image: "/product4.jpg" },
];

const TopProducts = () => {
  return (
    <Paper sx={{ p: 2, height: "340px" }}>
      <Typography variant="h6" gutterBottom>
        Productos Más Vendidos
      </Typography>
      <List>
        {topProducts.map((product, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={product.image} />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`${product.sales} ventas`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopProducts;
