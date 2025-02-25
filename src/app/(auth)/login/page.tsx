"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/user";
import type { z } from "zod";

import { ROUTE } from "@/config/route";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from "../_components/card";
import SocialButtons from "../_components/social-buttons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || ROUTE.HOME;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: callbackUrl,
    });
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message}
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            size="small"
            variant="outlined"
            {...register("email")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            size="small"
            variant="outlined"
            {...register("password")}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SocialButtons type="login" />
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <MuiLink
            component={Link}
            href={ROUTE.AUTH.REGISTER}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Card>
  );
};

export default LoginPage;
