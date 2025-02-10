import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function OrderLoading() {
  return (
    <Container sx={{ my: 2 }}>
      <Skeleton width={300} height={40} sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Order Details Skeleton */}
            <Paper sx={{ p: 3 }}>
              <Skeleton width={200} height={32} sx={{ mb: 2 }} />
              <Skeleton
                variant="rounded"
                width={80}
                height={32}
                sx={{ mb: 2 }}
              />
              {[1, 2, 3].map((item) => (
                <Stack key={item} spacing={1} sx={{ mb: 2 }}>
                  <Skeleton width="60%" height={24} />
                  <Skeleton width="20%" height={20} />
                </Stack>
              ))}
            </Paper>

            {/* Shipping Info Skeleton */}
            <Paper sx={{ p: 3 }}>
              <Skeleton width={200} height={32} sx={{ mb: 2 }} />
              <Stack spacing={1}>
                <Skeleton width="70%" height={24} />
                <Skeleton width="50%" height={24} />
                <Skeleton width="40%" height={24} />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Order Summary Skeleton */}
          <Paper sx={{ p: 3 }}>
            <Skeleton width={200} height={32} sx={{ mb: 2 }} />
            <Skeleton width="70%" height={32} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
