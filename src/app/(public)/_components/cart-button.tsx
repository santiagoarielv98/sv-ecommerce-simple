"use client";

import Link from "next/link";
import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/contexts/cart-context";

const CartButton = () => {
  const { items } = useCart();

  return (
    <Tooltip title="Cart">
      <IconButton LinkComponent={Link} href="/cart">
        <Badge badgeContent={items.length} color="primary">
          <CartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default CartButton;
