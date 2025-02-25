import {
  AttachMoney,
  Inventory,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import {
  getMonthlySales,
  getRecentOrders,
  getStats,
  getTopProducts,
} from "@/lib/db/admin";
import MonthlySalesChart from "./_components/monthly-sales-chart";
import RecentOrders from "./_components/recent-orders";
import StatCard from "./_components/stat-card";
import TopProducts from "./_components/top-products";

const DashboardPage = async () => {
  const [
    { totalOrders, totalProducts, totalSalesAmount, totalUsers },
    monthlySales,
    recentOrders,
    topProductsWithDetails,
  ] = await Promise.all([
    getStats(),
    getMonthlySales(),
    getRecentOrders(),
    getTopProducts(),
  ]);
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
            title="Sales Total"
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
            title="Orders"
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
            title="Products"
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
            title="Users"
            value={totalUsers}
            icon={<Person />}
            color="#f44336"
          />
        </Grid>

        {/* Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <MonthlySalesChart salesData={monthlySales} />
        </Grid>

        {/* Top Products */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TopProducts products={topProductsWithDetails} />
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
