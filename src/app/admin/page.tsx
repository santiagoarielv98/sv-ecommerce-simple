"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Container } from "@mui/material";
import { getProducts } from "../actions/products";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueFormatter: (params) => `$${params}`,
  },
  { field: "stock", headerName: "Stock", width: 130 },
  {
    field: "category",
    headerName: "Category",
    width: 130,
    valueGetter: (params) => params.name,
  },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 100]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Container>
  );
}
