"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import useMediaQuery from "@mui/material/useMediaQuery";

import { adminNavigation } from "@/config/admin-navigation";

const AdminMobileSidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  if (!isMobile) return null;

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        display: { xs: "block", md: "none" },
      }}
    >
      <BottomNavigation
        value={pathname}
        onChange={(_, href) => handleNavigate(href)}
        showLabels
      >
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <BottomNavigationAction
              key={item.href}
              label={item.title}
              icon={<Icon />}
              value={item.href}
            />
          );
        })}
      </BottomNavigation>
    </AppBar>
  );
};

export default AdminMobileSidebar;
