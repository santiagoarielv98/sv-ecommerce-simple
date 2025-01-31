import { Container, Skeleton, Grid, Paper } from "@mui/material";

export default function LoadingOrders() {
  return (
    <Container sx={{ py: 4 }}>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid key={i} xs={12}>
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
