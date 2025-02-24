import Box from "@mui/material/Box";
import React from "react";

import Sidebar from "./_components/sidebar";
import { prisma } from "@/lib/prisma";

const HomeLayout = async ({ children }: React.PropsWithChildren) => {
  const [categories, price] = await Promise.all([
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.product.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    }),
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
      <Sidebar
        categories={categories}
        range={[price._min.price || 0, price._max.price || 0]}
      />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
