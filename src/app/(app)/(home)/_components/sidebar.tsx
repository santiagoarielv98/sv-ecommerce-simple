"use client";

import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";

import DesktopSidebarLoading from "./desktop-sidebar-loading";
import MobileSidebarLoading from "./mobile-sidebar-loading";

const DesktopSidebar = dynamic(() => import("./desktop-sidebar"), {
  loading: () => <DesktopSidebarLoading />,
  ssr: false,
});
const MobileSidebar = dynamic(() => import("./mobile-sidebar"), {
  loading: () => <MobileSidebarLoading />,
  ssr: false,
});

const Sidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
};

export default Sidebar;
