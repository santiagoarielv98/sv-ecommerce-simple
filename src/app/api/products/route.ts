import { auth } from "@/lib/auth";
import client from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const db = (await client).db();
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}
