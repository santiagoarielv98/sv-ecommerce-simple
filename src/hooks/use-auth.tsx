import { useSession } from "next-auth/react";
import React from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const user = React.useMemo(() => session?.user || null, [session]);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isAdmin = user?.role === "ADMIN";

  //   const hasPermission = useCallback(
  //     (requiredRole: Role) => {
  //       if (!user) return false;

  //       switch (requiredRole) {
  //         case "ADMIN":
  //           return user.role === "admin";
  //         case "USER":
  //           return ["admin", "user"].includes(user.role);
  //         default:
  //           return false;
  //       }
  //     },
  //     [user],
  //   );

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    isAdmin,
  } as const;
};
