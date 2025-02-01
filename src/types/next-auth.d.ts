import { Role } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    role: Role;
  }
}
