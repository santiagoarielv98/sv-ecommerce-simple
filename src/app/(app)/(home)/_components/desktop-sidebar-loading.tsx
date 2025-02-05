"use client";

import { drawerWidth } from "@/config/drawer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";
import Toolbar from "@mui/material/Toolbar";

const DesktopSidebarLoading = () => {
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
      <Box sx={{ overflow: "auto", p: 2 }}>
        <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={100} />
      </Box>
    </Drawer>
  );
};

export default DesktopSidebarLoading;
