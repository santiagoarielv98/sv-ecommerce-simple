import { fakerES } from "@faker-js/faker";
import type { Category } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES: Omit<Category, "id">[] = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
  { name: "Home" },
];

const MAX_PRODUCTS = 100;

async function main() {
  // await prisma.category.createMany({
  //   data: CATEGORIES,
  // });
  const categories = await Promise.all(
    CATEGORIES.map((category) =>
      prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      }),
    ),
  );

  await Promise.all(
    Array.from({ length: MAX_PRODUCTS }).map(() =>
      prisma.product.create({
        data: {
          name: fakerES.commerce.productName(),
          description: fakerES.commerce.productDescription(),
          price: parseFloat(fakerES.commerce.price()),
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
          stock: fakerES.helpers.rangeToNumber({ min: 1, max: 100 }),
        },
      }),
    ),
  );
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
