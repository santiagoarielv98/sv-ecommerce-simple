"use client";

import { useAuth } from "@/hooks/use-auth";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserMenu from "../_hooks/use-user-menu";
import {
  AdminMenuItems,
  AuthenticatedMenuItems,
  GuestMenuItems,
} from "./menu-items";

const UserMenu = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { anchorElUser, handleOpen, handleClose } = useUserMenu();

  const menu = !isAuthenticated ? (
    <GuestMenuItems onClose={handleClose} />
  ) : isAdmin ? (
    <AdminMenuItems onClose={handleClose} />
  ) : (
    <AuthenticatedMenuItems onClose={handleClose} />
  );

  return (
    <Box>
      <Tooltip title="Open settings">
        {isMobile ? (
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpen} sx={{ p: 0 }}>
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
        onClose={handleClose}
      >
        {menu}
      </Menu>
    </Box>
  );
};

export default UserMenu;
