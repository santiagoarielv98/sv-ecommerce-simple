import { Add } from "@mui/icons-material";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import ProductTable from "./table";

const ProductsPage = async () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Typography variant="h5" component="h2">
              Productos
            </Typography>
            <Button variant="contained" startIcon={<Add />}>
              Nuevo Producto
            </Button>
          </Stack>

          <div style={{ height: 700, width: "100%" }}>
            <ProductTable />
          </div>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProductsPage;
