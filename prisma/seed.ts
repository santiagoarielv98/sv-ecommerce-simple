import type { Category } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES: Omit<Category, "id">[] = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
  { name: "Home" },
];

async function main() {
  const categories = await prisma.category.createMany({
    data: CATEGORIES,
  });

  console.log("Created categories:", categories);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
