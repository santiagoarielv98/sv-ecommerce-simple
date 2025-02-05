import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function CheckoutLoading() {
  return (
    <Container sx={{ my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width={200} />
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width={150} />
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton height={56} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton height={56} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Skeleton height={42} width="70%" />
                </Grid>
              </Grid>
              <Skeleton height={48} sx={{ mt: 3 }} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width={120} />
              </Typography>
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={60}
                  sx={{ mb: 2 }}
                />
              ))}
              <Skeleton
                variant="rectangular"
                height={48}
                sx={{ mt: 2, pt: 2 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
