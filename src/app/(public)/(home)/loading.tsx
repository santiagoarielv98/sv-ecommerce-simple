import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

const Loading = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Toolbar
        sx={{
          display: { md: "none", xs: "flex" },
        }}
      />
      <Stack spacing={2}>
        <Skeleton width={200} height={40} />
        <Grid2 container spacing={3}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid2
              key={index}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Box>
                <Skeleton
                  variant="rectangular"
                  height="auto"
                  sx={{ aspectRatio: "16/9" }}
                />
                <Box sx={{ px: 1, py: 2 }}>
                  <Skeleton sx={{ mb: 1 }} variant="rectangular" />
                  <Skeleton width="60%" sx={{ mb: 2 }} />
                  <Skeleton width="40%" variant="rectangular" sx={{ mb: 4 }} />
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width={300} height={40} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Loading;
