"use client";

import Box from "@mui/material/Box";
import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";

const DesktopSidebar = dynamic(() => import("./_components/desktop-sidebar"));
const MobileSidebar = dynamic(() => import("./_components/mobile-sidebar"));

const HomeLayout = ({ children }: React.PropsWithChildren) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? <MobileSidebar /> : <DesktopSidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default HomeLayout;
