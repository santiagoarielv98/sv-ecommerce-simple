import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/user";
import { comparePassword } from "@/utils/password";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

class UnregisteredUser extends CredentialsSignin {
  code = "unregistered";
}

export default {
  providers: [
    Github,
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = loginSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: email,
            accounts: {
              some: {
                provider: "email",
              },
            },
          },
        });

        if (!user) {
          throw new UnregisteredUser();
        }

        const passwordMatches = await comparePassword(password, user.password!);

        if (!passwordMatches) {
          throw new CredentialsSignin();
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
