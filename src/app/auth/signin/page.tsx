"use client";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement sign in logic here
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GithubIcon />}
          onClick={handleGithubSignIn}
        >
          Continue with GitHub
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <Button href="/auth/signup" sx={{ textTransform: "none" }}>
              Sign up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
