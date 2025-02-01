import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [GitHub],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;
