"use client";

import {
  AttachMoney,
  Inventory,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import RecentOrders from "./components/RecentOrders";
import StatCard from "./components/StatCard";
import TopProducts from "./components/TopProducts";

// Datos de prueba
const salesData = [
  { name: "Ene", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Abr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const DashboardPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Ventas Totales"
            value="$23,500"
            icon={<AttachMoney />}
            color="#2196f3"
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Órdenes"
            value="150"
            icon={<ShoppingCart />}
            color="#4caf50"
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Productos"
            value="45"
            icon={<Inventory />}
            color="#ff9800"
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Usuarios"
            value="120"
            icon={<Person />}
            color="#f44336"
          />
        </Grid>

        {/* Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Ventas Mensuales
            </Typography>
            <ResponsiveContainer>
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TopProducts />
        </Grid>

        {/* Orders Table */}
        <Grid size={{ xs: 12 }}>
          <RecentOrders />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
