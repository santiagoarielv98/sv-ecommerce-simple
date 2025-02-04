import { getProductsPage } from "@/actions/products";
import { auth } from "@/lib/auth";
import { Box, Button, Container, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductTable from "./product-table";

export default async function AdminDashboard() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }
  const pagination = await getProductsPage();

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
        <Button
          component={Link}
          href="/admin/products/new"
          variant="contained"
          color="primary"
        >
          New Product
        </Button>
      </Box>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <ProductTable initialValue={pagination} />
      </Box>
    </Container>
  );
}
