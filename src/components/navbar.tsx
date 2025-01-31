"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export default function Navbar() {
  const { data: session } = useSession();

  const { items } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          E-Commerce
        </Typography>

        {session ? (
          <>
            <Button
              color="inherit"
              component={Link}
              href="/orders"
              sx={{ mr: 2 }}
            >
              My Orders
            </Button>
            {session.user?.role === "ADMIN" && (
              <Button
                color="inherit"
                component={Link}
                href="/admin"
                sx={{ mr: 2 }}
              >
                Admin Dashboard
              </Button>
            )}
            <IconButton onClick={handleMenuOpen}>
              <Avatar src={session.user?.image || undefined} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {session.user.role === "ADMIN" && (
                <MenuItem
                  component={Link}
                  href="/admin"
                  onClick={handleMenuClose}
                >
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} href="/auth/signin">
            Sign In
          </Button>
        )}

        <IconButton component={Link} href="/cart" sx={{ ml: 2 }}>
          <Badge badgeContent={itemCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
