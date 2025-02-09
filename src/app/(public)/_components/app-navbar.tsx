"use client";

import Search from "@/components/forms/search";
import { navItems } from "@/config/nav";
import { route } from "@/config/route";
import { useCart } from "@/contexts/cart-context";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

function ResponsiveAppBar() {
  const { items } = useCart();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href={route.home}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

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
              <Tooltip
                title="Open settings"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <IconButton onClick={handleOpenUserMenu}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, display: { xs: "none", md: "flex" } }}
                >
                  <Avatar>U</Avatar>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart">
                <IconButton LinkComponent={Link} href="/cart">
                  <Badge badgeContent={items.length} color="primary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Stack>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {navItems.map((nav, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  href={nav.href}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {nav.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
