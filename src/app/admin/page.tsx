"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueFormatter: (params) => `$${params}`,
  },
  { field: "stock", headerName: "Stock", width: 130 },
  { field: "categoryId", headerName: "Category ID", width: 130 },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Verificar si el usuario es admin
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }

    // Cargar productos
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Dashboard
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Container>
  );
}
