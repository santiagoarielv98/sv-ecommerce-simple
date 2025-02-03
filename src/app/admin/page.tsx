import { getProductsPage } from "@/actions/products";
import { auth } from "@/lib/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";
import ProductTable from "./product-table";

export default async function AdminDashboard() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }
  const pagination = await getProductsPage();

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
      </Box>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <ProductTable initialValue={pagination} />;
      </Box>
    </Container>
  );
}
