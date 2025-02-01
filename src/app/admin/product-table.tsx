"use client";

import { Box, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";

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
  { field: "categoryId", headerName: "Category ID", width: 130 },
];

export interface AdminDashboardProps {
  products: Product[];
}

export default function ProductTable({ products }: AdminDashboardProps) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Container>
  );
}
