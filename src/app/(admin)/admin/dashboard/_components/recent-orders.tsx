import { getStatusColor } from "@/utils/order";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Order } from "@prisma/client";

type Prpos = {
  orders: Array<
    Order & {
      user: {
        name: string | null;
      };
    }
  >;
};

const RecentOrders = ({ orders }: Prpos) => {
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
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                  {order.createdAt.toLocaleDateString("es-AR")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
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
