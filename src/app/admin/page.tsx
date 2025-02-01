import { prisma } from "@/lib/prisma";
import ProductTable from "./product-table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }
  const products = await prisma.product.findMany();
  return <ProductTable products={products} />;
}
