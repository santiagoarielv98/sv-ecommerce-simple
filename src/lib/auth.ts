import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import client from "@/lib/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const db = client.db();
        const user = await db.collection("users").findOne({
          email: session.user.email,
        });

        if (user) {
          session.user.role = user.role;
        }
      }

      return session;
    },
  },
  session: {
    strategy: "database",
  },
});
