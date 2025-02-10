"use client";

import { ROUTE } from "@/config/route";
import GithubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

interface SocialButtonsProps {
  type: "login" | "register";
}

export default function SocialButtons({ type }: SocialButtonsProps) {
  const text = type === "login" ? "Sign in" : "Sign up";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn("github", { redirectTo: ROUTE.HOME })}
        startIcon={<GithubIcon />}
      >
        {text} with GitHub
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn("google", { redirectTo: ROUTE.HOME })}
        startIcon={<GoogleIcon />}
      >
        {text} with Google
      </Button>
    </Box>
  );
}
