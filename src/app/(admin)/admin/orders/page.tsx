"use client";

import { Container, Paper, Typography } from "@mui/material";
import OrderTable from "./table";

const OrdersPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, display: "flex", flexGrow: 1 }}
    >
      <Paper
        sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Órdenes
        </Typography>

        <div style={{ flexGrow: 1 }}>
          <OrderTable />
        </div>

        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
          <MenuItem onClick={handleMenuClose}>Actualizar estado</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cancelar orden</MenuItem>
        </Menu> */}
      </Paper>
    </Container>
  );
};

export default OrdersPage;
