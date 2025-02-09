import Box from "@mui/material/Box";
import React from "react";

import Sidebar from "./_components/sidebar";
import { prisma } from "@/lib/prisma";

const HomeLayout = async ({ children }: React.PropsWithChildren) => {
  const [categories] = await Promise.all([
    prisma.category.findMany({ take: 5 }),
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Sidebar categories={categories} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
