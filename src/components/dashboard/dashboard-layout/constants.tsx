import {
  Category,
  Label,
  People,
  Store,
  ShoppingBasket,
  Dashboard,
  LocationCity,
  ColorLens,
  Loyalty,
  EditAttributes,
  PhoneAndroid,
} from "@mui/icons-material";

export const SIDEBAR_ITEMS = [
  { href: "/admin/dashboard", Icon: Dashboard, text: "Dashboard" },
  { href: "/admin/dashboard/badges", Icon: Label, text: "Badges" },
  { href: "/admin/dashboard/brands", Icon: Loyalty, text: "Brands" },
  { href: "/admin/dashboard/categories", Icon: Category, text: "Categories" },
  { href: "/admin/dashboard/cities", Icon: LocationCity, text: "Cities" },
  { href: "/admin/dashboard/colors", Icon: ColorLens, text: "Colors" },
  {
    href: "/admin/dashboard/properties",
    Icon: EditAttributes,
    text: "Properties",
  },
  { href: "/admin/dashboard/products", Icon: PhoneAndroid, text: "Products" },
  { href: "/admin/dashboard/users", Icon: People, text: "Users" },
  { href: "/admin/dashboard/sellers", Icon: Store, text: "Sellers" },
  { href: "/admin/dashboard/orders", Icon: ShoppingBasket, text: "Orders" },
];
