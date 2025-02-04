import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingOrders() {
  return (
    <Container sx={{ my: 2 }}>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 12 }}>
            <Paper sx={{ p: 3, mb: 2 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
