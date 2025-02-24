"use client";

import { Container, Paper, Typography } from "@mui/material";
import OrderTable from "./table";

const CategoriesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Categorías
        </Typography>

        <div style={{ height: 400, width: "100%" }}>
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

export default CategoriesPage;
