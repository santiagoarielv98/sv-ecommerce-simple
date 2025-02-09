"use client";

import Search from "@/components/forms/search";
import Logo from "@/components/logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import CartButton from "./cart-button";
import UserMenu from "./user-menu";

function AppNavbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }}>
            <Search />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack
              direction="row"
              spacing={{
                xs: 1,
                md: 2,
              }}
            >
              <UserMenu />
              <CartButton />
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavbar;
