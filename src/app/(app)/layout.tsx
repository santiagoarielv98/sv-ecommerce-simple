import Box from "@mui/material/Box";
import React from "react";
import AppNavbar from "./_components/app-navbar";
import Toolbar from "@mui/material/Toolbar";

const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <AppNavbar />
      <Toolbar />
      {children}
    </Box>
  );
};

export default AppLayout;
