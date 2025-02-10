"use client";

import { ROUTE } from "@/config/route";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import Card from "../_components/card";
import SocialButtons from "../_components/social-buttons";

export default function SignUp() {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  // const [nameError, setNameError] = React.useState(false);
  // const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  // const validateInputs = () => {
  //   const email = document.getElementById("email") as HTMLInputElement;
  //   const password = document.getElementById("password") as HTMLInputElement;
  //   const name = document.getElementById("name") as HTMLInputElement;

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid email address.");
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("Password must be at least 6 characters long.");
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage("");
  //   }

  //   if (!name.value || name.value.length < 1) {
  //     setNameError(true);
  //     setNameErrorMessage("Name is required.");
  //     isValid = false;
  //   } else {
  //     setNameError(false);
  //     setNameErrorMessage("");
  //   }

  //   return isValid;
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   if (nameError || emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     name: data.get("name"),
  //     lastName: data.get("lastName"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        // onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          filter: "blur(5px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            size="small"
            disabled
            // error={nameError}
            // helperText={nameErrorMessage}
            // color={nameError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            size="small"
            variant="outlined"
            disabled
            // error={emailError}
            // helperText={emailErrorMessage}
            // color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            size="small"
            variant="outlined"
            disabled
            // error={passwordError}
            // helperText={passwordErrorMessage}
            // color={passwordError ? "error" : "primary"}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled
          // onClick={validateInputs}
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
