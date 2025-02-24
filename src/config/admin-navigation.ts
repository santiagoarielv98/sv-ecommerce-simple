import {
  Category,
  Dashboard,
  Inventory,
  ShoppingCart,
} from "@mui/icons-material";

export const adminNavigation = [
  {
    title: "Dashboard",
    icon: Dashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Órdenes",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Productos",
    icon: Inventory,
    href: "/admin/products",
  },
  {
    title: "Categorías",
    icon: Category,
    href: "/admin/categories",
  },
  //   {
  //     title: "Usuarios",
  //     icon: People,
  //     href: "/admin/users",
  //   },
  //   {
  //     title: "Configuración",
  //     icon: Settings,
  //     href: "/admin/settings",
  //   },
];
