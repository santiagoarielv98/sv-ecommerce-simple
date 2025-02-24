"use client";

import { MoreVert } from "@mui/icons-material";
import {
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const getStatusColor = (status: string) => {
  const colors = {
    PENDING: "warning",
    PROCESSING: "info",
    SHIPPED: "primary",
    DELIVERED: "success",
    CANCELLED: "error",
  };
  return colors[status as keyof typeof colors];
};

const columns: GridColDef<{ tuvieja: string }>[] = [
  { field: "id", headerName: "ID Orden", width: 100 },
  { field: "customer", headerName: "Cliente", width: 200 },
  { field: "date", headerName: "Fecha", width: 130 },
  { field: "items", headerName: "Items", width: 90 },
  {
    field: "status",
    headerName: "Estado",
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={getStatusColor(params.value)}
        size="small"
      />
    ),
  },
  {
    field: "total",
    headerName: "Total",
    width: 130,
    valueFormatter: (params) => `$${params.toFixed(2)}`,
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
        <MoreVert />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: "1",
    customer: "John Doe",
    date: "2024-02-20",
    status: "PENDING",
    total: 125.99,
    items: 3,
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2024-02-19",
    status: "DELIVERED",
    total: 225.5,
    items: 2,
  },
];

const OrdersPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Órdenes
        </Typography>

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

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
          <MenuItem onClick={handleMenuClose}>Actualizar estado</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cancelar orden</MenuItem>
        </Menu>
      </Paper>
    </Container>
  );
};

export default OrdersPage;
