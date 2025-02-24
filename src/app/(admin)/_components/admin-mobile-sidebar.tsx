"use client";

import { Menu as MenuIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { adminNavigation } from "@/config/admin-navigation";

const AdminMobileSidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    handleClose();
  };

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        top: (theme) => (theme.mixins.toolbar.minHeight as number) - 1,
        left: 0,
        right: 0,
        display: { xs: "flex", md: "none" },
        p: 1,
        zIndex: 1000,
        gap: 1,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<MenuIcon />}
        onClick={handleClick}
        size="small"
      >
        Menú
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List sx={{ width: 280 }}>
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.href)}
                  selected={isActive}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "inherit" : "text.secondary",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Menu>
    </Paper>
  );
};

export default AdminMobileSidebar;
