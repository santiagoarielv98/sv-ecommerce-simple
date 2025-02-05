import Box from "@mui/material/Box";
import React from "react";

import Sidebar from "./_components/sidebar";

const HomeLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <React.Suspense>{children}</React.Suspense>
        </Box>
      </Box>
    </>
  );
};

export default HomeLayout;
