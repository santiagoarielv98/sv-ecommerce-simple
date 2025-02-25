import type { Metadata } from "next";
import RegisterForm from "../_components/form/register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUp() {
  return <RegisterForm />;
}
