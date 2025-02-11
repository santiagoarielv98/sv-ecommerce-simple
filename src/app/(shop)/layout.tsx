import Box from "@mui/material/Box";
import React from "react";
import AppNavbar from "./_components/app-navbar";
import Toolbar from "@mui/material/Toolbar";

const ShopLayout = ({ children }: React.PropsWithChildren) => {
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
      <AppNavbar />
      <Toolbar />
      {children}
    </Box>
  );
};

export default ShopLayout;
