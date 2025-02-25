import bcrypt from "bcryptjs";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "12");

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
