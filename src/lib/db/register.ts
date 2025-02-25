"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema, type RegisterSchema } from "@/lib/schemas/user";
import { hashPassword } from "@/utils/password";
import { ZodError } from "zod";

export const register = async (credentials: RegisterSchema) => {
  try {
    const data = registerSchema.parse(credentials);

    const email = await prisma.user.findFirst({
      where: {
        email: data.email,
        accounts: {
          some: {
            provider: "email",
          },
        },
      },
    });

    if (email) {
      return {
        success: false,
        errors: [
          {
            message: "This email is already registered",
            path: ["email"],
          },
        ],
      };
    }

    await prisma.$transaction(async (tx) => {
      const password = await hashPassword(data.password);
      const user = await tx.user.upsert({
        where: {
          email: data.email,
        },
        update: {
          password: password,
        },
        create: {
          email: data.email,
          name: data.name,
          password: password,
        },
      });

      await tx.account.create({
        data: {
          userId: user.id,
          provider: "email",
          type: "email",
          providerAccountId: user.id.toString(),
        },
      });
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.errors };
    }
    return {
      success: false,
      errors: [
        {
          message: "Something went wrong. Please try again later.",
          path: ["root"],
        },
      ],
    };
  }
};
