"use client";

import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";

const DesktopSidebar = dynamic(() => import("./desktop-sidebar"));
const MobileSidebar = dynamic(() => import("./mobile-sidebar"));

const Sidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
};

export default Sidebar;
