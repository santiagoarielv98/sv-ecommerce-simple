import {
  AttachMoney,
  Inventory,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import { prisma } from "@/lib/prisma";
import MonthlySalesChart from "./_components/monthly-sales-chart";
import RecentOrders from "./_components/recent-orders";
import StatCard from "./_components/stat-card";
import TopProducts from "./_components/top-products";

const DashboardPage = async () => {
  // Fetch stats
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  const totalUsers = await prisma.user.count();
  const totalSales = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const recentOrders = await prisma.order.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const totalSalesAmount = totalSales._sum.total ?? 0;

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
            value={`$${totalSalesAmount.toLocaleString()}`}
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
            value={totalOrders}
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
            value={totalProducts}
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
            value={totalUsers}
            icon={<Person />}
            color="#f44336"
          />
        </Grid>

        {/* Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <MonthlySalesChart />
        </Grid>

        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TopProducts />
        </Grid>

        {/* Orders Table */}
        <Grid size={{ xs: 12 }}>
          <RecentOrders orders={recentOrders} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
