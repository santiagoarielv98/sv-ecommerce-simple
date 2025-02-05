import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Container
          sx={{
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
