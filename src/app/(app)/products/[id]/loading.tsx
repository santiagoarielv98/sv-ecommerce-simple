import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProductDetailLoading() {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={1}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" width={80} height={80} />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Box>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Box>

            <Skeleton variant="text" width={120} height={32} />

            <Stack spacing={1}>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Stack>

            <Box>
              <Skeleton variant="text" width={140} height={24} sx={{ mb: 2 }} />
              <Skeleton
                variant="rounded"
                width={120}
                height={36}
                sx={{ mb: 2 }}
              />
              <Skeleton variant="rounded" width="100%" height={48} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
