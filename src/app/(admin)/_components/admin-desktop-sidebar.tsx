"use client";

import Box from "@mui/material/Box";

import { drawerWidth } from "@/config/drawer";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

const AdminDesktopSidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  if (isMobile) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}></Box>
    </Drawer>
  );
};

export default AdminDesktopSidebar;
