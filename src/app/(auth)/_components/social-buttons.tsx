"use client";

import { ROUTE } from "@/config/route";
import GithubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface SocialButtonsProps {
  type: "login" | "register";
}

const socialItems = [
  {
    name: "GitHub",
    icon: <GithubIcon />,
    provider: "github",
  },
  {
    name: "Google",
    icon: <GoogleIcon />,
    provider: "google",
  },
];

export default function SocialButtons({ type }: SocialButtonsProps) {
  const searchParams = useSearchParams();
  const text = type === "login" ? "Sign in" : "Sign up";

  const callbackUrl = searchParams.get("callbackUrl") || ROUTE.HOME;
  console.log("callbackUrl", callbackUrl);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {socialItems.map((item) => (
        <Button
          key={item.provider}
          fullWidth
          variant="outlined"
          onClick={() =>
            signIn(item.provider, {
              redirectTo: callbackUrl,
            })
          }
          startIcon={item.icon}
        >
          {text} with {item.name}
        </Button>
      ))}
    </Box>
  );
}
