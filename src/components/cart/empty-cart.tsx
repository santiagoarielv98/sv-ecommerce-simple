import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function EmptyCart() {
  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your cart is empty
      </Typography>
    </Container>
  );
}
