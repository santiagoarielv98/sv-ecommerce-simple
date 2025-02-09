import { auth } from "@/lib/auth";
import AppLayout from "../(public)/layout";
import { redirect } from "next/navigation";

const StoreLayout = async ({ children }: React.PropsWithChildren) => {
  const user = await auth();
  if (!user) {
    return redirect("/login");
  }
  return <AppLayout>{children}</AppLayout>;
};

export default StoreLayout;
