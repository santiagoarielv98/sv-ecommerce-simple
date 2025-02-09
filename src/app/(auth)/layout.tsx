import { auth } from "@/lib/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import AuthNavbar from "./_components/auth-navbar";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AuthNavbar />
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Container
          sx={{
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
