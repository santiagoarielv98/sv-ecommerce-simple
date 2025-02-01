import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
  const products = await prisma.product.findMany();
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <ProductTable products={products} />;
      </Box>
    </Container>
  );
}
