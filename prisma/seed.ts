import { hashPassword } from "../src/utils/password";
import { fakerES } from "@faker-js/faker";
import type { Category } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES: Omit<Category, "id" | "deleted">[] = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
  { name: "Home" },
];

const MAX_USERS = 3;
const MAX_PRODUCTS = 50;
const MAX_ORDERS = 100;

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      image: fakerES.image.avatar(),
      email: "admin@example.com",
      name: "admin",
      password: await hashPassword("password"),
      emailVerified: new Date(),
      role: "ADMIN",
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      image: fakerES.image.avatar(),
      email: "demo@example.com",
      name: "demo",
      password: await hashPassword("password"),
      emailVerified: new Date(),
    },
  });

  const users = await Promise.all(
    Array.from({ length: MAX_USERS }).map(() =>
      prisma.user.create({
        data: {
          image: fakerES.image.avatar(),
          email: fakerES.internet.email(),
          name: fakerES.person.fullName(),
          password: fakerES.internet.password(),
          emailVerified: new Date(),
        },
      }),
    ),
  );

  users.push(demo);

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
          images: Array.from({ length: 3 }).map(() =>
            fakerES.image.urlPicsumPhotos({ width: 320, height: 240 }),
          ),
        },
      }),
    ),
  );

  // crear ordenes
  const products = await prisma.product.findMany();
  await Promise.all(
    Array.from({ length: MAX_ORDERS }).map(() => {
      const items = Array.from({ length: Math.floor(Math.random() * 5) }).map(
        () => {
          const quantity = Math.floor(Math.random() * 5);
          const product = products[Math.floor(Math.random() * products.length)];
          return {
            quantity,
            price: product.price,
            productId: product.id,
          };
        },
      );

      return prisma.order.create({
        data: {
          userId: users[Math.floor(Math.random() * users.length)].id,
          items: {
            create: items,
          },
          total: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
          status: "PROCESSING",
          shippingAddress: {
            create: {
              address1: fakerES.location.streetAddress(),
              city: fakerES.location.city(),
              country: fakerES.location.country(),
              zip: fakerES.location.zipCode(),
              state: fakerES.location.state(),
              firstName: fakerES.person.firstName(),
              lastName: fakerES.person.lastName(),
            },
          },
        },
      });
    }),
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
