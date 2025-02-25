import { ROUTE } from "@/config/route";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Logo = () => {
  return (
    <Typography
      component={Link}
      href={ROUTE.HOME}
      variant="h6"
      noWrap
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: "inherit",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "0.75rem",
        gap: 1,
      }}
    >
      <ShoppingCartCheckoutSharpIcon />
      <Typography
        variant="inherit"
        sx={{
          mr: 2,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        SV ECOMMERCE
      </Typography>
    </Typography>
  );
};

export default Logo;
