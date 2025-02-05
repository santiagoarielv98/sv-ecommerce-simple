import Box from "@mui/material/Box";
import React from "react";
import AppNavbar from "./_components/app-navbar";

const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100%" }}>
      <AppNavbar />
      {children}
    </Box>
  );
};

export default AppLayout;
