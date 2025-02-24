import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import AdminNavbar from "./_components/admin-navbar";
import AdminSidebar from "./_components/admin-sidebar";

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AdminNavbar />
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <AdminSidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
