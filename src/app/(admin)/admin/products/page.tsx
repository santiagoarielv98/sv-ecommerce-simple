"use client";

import { Add } from "@mui/icons-material";
import { Button, Container, Paper, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Nombre", width: 200 },
  {
    field: "price",
    headerName: "Precio",
    width: 130,
    valueFormatter: (params) => `$${params}`,
  },
  { field: "stock", headerName: "Stock", width: 130 },
  { field: "category", headerName: "Categoría", width: 160 },
  {
    field: "actions",
    headerName: "Acciones",
    width: 160,
    sortable: false,
    renderCell: (params) => (
      <>
        <Button size="small" color="primary">
          Editar
        </Button>
        <Button size="small" color="error">
          Eliminar
        </Button>
      </>
    ),
  },
];

const rows = [
  {
    id: "1",
    name: "Producto 1",
    price: 99.99,
    stock: 10,
    category: "Electrónicos",
  },
  { id: "2", name: "Producto 2", price: 149.99, stock: 5, category: "Ropa" },
];

const ProductsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Productos
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            Nuevo Producto
          </Button>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ProductsPage;
