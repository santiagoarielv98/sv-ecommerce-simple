import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

const orders = [
  {
    id: "1",
    customer: "John Doe",
    date: "2024-02-20",
    status: "DELIVERED",
    total: 125.99,
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2024-02-19",
    status: "PROCESSING",
    total: 225.5,
  },
  {
    id: "3",
    customer: "Bob Johnson",
    date: "2024-02-18",
    status: "PENDING",
    total: 75.0,
  },
];

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

const RecentOrders = () => {
  return (
    <Paper sx={{ p: 2, overflow: "hidden", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Órdenes Recientes
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Orden</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentOrders;
