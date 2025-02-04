"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

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
    <AppBar position="fixed" color="default">
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
              <Button color="inherit" component={Link} href="/admin">
                Admin
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
