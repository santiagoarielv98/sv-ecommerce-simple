"use client";

import Logo from "@/components/logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

function AuthNavbar() {
  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AuthNavbar;
