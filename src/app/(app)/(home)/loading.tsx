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
        <Skeleton variant="text" width={200} height={40} />
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
              <Box sx={{ p: 2 }}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
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
