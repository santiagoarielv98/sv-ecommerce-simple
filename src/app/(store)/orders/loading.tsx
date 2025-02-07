import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function OrdersLoading() {
  return (
    <Container sx={{ my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width={200} />
        </Typography>
        <Grid container spacing={3}>
          {[1, 2].map((index) => (
            <Grid key={index} size={{ xs: 12 }}>
              <Paper sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Skeleton width={100} height={32} />
                  <Skeleton width={80} height={32} variant="rounded" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Skeleton width={120} height={24} />
                  <Skeleton width={80} height={32} />
                </Stack>
                <Stack>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={200} height={20} />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
