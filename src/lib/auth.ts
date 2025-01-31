import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  // callbacks: {
  //   async session({ session }) {
  //     if (session.user?.email) {
  //       const user = await prisma.user.findUnique({
  //         where: { email: session.user.email },
  //       });

  //       if (user) {
  //         session.user.role = user.role;
  //       }
  //     }

  //     return session;
  //   },
  // },
  // session: {
  //   strategy: "database",
  // },
});
