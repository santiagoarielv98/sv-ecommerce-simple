"use client";

import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSession } from "next-auth/react";
import React from "react";
import {
  AdminMenuItems,
  AuthenticatedMenuItems,
  GuestMenuItems,
} from "./menu-items";

const UserMenu = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isGuest = !session;
  const isAdmin = session?.user?.role === "ADMIN";

  const menu = isGuest ? (
    <GuestMenuItems onClose={handleCloseUserMenu} />
  ) : isAdmin ? (
    <AdminMenuItems onClose={handleCloseUserMenu} />
  ) : (
    <AuthenticatedMenuItems onClose={handleCloseUserMenu} />
  );

  return (
    <Box>
      <Tooltip title="Open settings">
        {isMobile ? (
          <IconButton onClick={handleOpenUserMenu}>
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>U</Avatar>
          </IconButton>
        )}
      </Tooltip>
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
        {menu}
      </Menu>
    </Box>
  );
};

export default UserMenu;
