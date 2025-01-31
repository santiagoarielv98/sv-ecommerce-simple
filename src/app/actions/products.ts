"use server";

import client from "@/lib/client";

export async function getProducts() {
  const db = (await client).db();
  const products = await db
    .collection("products")
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
          "category.name": 1,
        },
      },
    ])
    .toArray();

  return products.map((product) => ({
    ...product,
    id: product._id.toString(),
  }));
}
