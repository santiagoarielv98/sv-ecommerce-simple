"use client";

import { useCart } from "@/hooks/use-cart";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  const handleProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      color="default"
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Store Logo
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mr: 2 }}
        />

        <IconButton color="inherit">
          <Badge badgeContent={itemCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {isLoggedIn ? (
          <IconButton onClick={handleProfileMenu}>
            <Avatar>U</Avatar>
          </IconButton>
        ) : (
          <IconButton onClick={handleProfileMenu}>
            <Avatar>S</Avatar>
          </IconButton>
        )}
        {isLoggedIn ? (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseProfileMenu}
          >
            <MenuItem>My Orders</MenuItem>
            {isAdmin && <MenuItem>Admin Panel</MenuItem>}
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseProfileMenu}
          >
            <MenuItem>Register</MenuItem>
            <MenuItem>Login</MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
}
