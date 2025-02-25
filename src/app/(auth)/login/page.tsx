import type { Metadata } from "next";
import LoginForm from "../_components/form/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
