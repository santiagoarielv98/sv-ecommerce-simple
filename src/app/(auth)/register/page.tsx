"use client";

import { ROUTE } from "@/config/route";
import { register } from "@/lib/db/register";
import { registerSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import Card from "../_components/card";
import SocialButtons from "../_components/social-buttons";
import Alert from "@mui/material/Alert";
import { DEMO_CRENDETIALS } from "@/config/demo";

export default function SignUp() {
  const router = useRouter();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await register(data);

    if (!result.success && result.errors) {
      result.errors.forEach((error) => {
        const field = error.path[0] as "email" | "password" | "name";
        setError(field, {
          type: "manual",
          message: error.message,
        });
      });
      return;
    }

    router.push(ROUTE.AUTH.LOGIN);
  });

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>

      <Alert severity="info" sx={{ width: "100%" }}>
        You can also use demo credentials to login:
        <br />
        Email: {DEMO_CRENDETIALS.email}
        <br />
        Password: {DEMO_CRENDETIALS.password}
      </Alert>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl error={!!errors.name}>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            {...registerForm("name")}
            autoComplete="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            size="small"
          />
          {errors.name && (
            <FormHelperText>{errors.name.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            {...registerForm("email")}
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            autoComplete="email"
            size="small"
          />
          {errors.email && (
            <FormHelperText>{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            {...registerForm("password")}
            required
            fullWidth
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            size="small"
          />
          {errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
        >
          Sign up
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SocialButtons type="register" />
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <MuiLink
            component={Link}
            href={ROUTE.AUTH.LOGIN}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Card>
  );
}
