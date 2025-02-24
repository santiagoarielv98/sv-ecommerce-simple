"use client";

import useMediaQuery from "@mui/material/useMediaQuery";

import AdminDesktopSidebar from "./admin-desktop-sidebar";
import AdminMobileSidebar from "./admin-mobile-sidebar";

const AdminSidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return isMobile ? <AdminMobileSidebar /> : <AdminDesktopSidebar />;
};

export default AdminSidebar;
