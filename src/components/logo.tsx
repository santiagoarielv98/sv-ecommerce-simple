import React from "react";

import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import { ROUTE } from "@/config/route";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ShoppingCartCheckoutSharpIcon sx={{ mr: 1 }} />
      <Typography
        component={Link}
        href={ROUTE.HOME}
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          color: "inherit",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "0.75rem",
        }}
      >
        SV ECOMMERCE
      </Typography>
    </Box>
  );
};

export default Logo;
