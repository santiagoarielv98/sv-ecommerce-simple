import Box from "@mui/material/Box";
import React from "react";

import Sidebar from "./_components/sidebar";

const HomeLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default HomeLayout;
