import {
  Category,
  Label,
  People,
  Store,
  ShoppingBasket,
  Dashboard,
  LocationCity,
  ColorLens,
  Apple,
  EditAttributes,
  PhoneAndroid,
} from "@mui/icons-material";

export const SIDEBAR_ITEMS = [
  { href: "/dashboard", Icon: Dashboard, text: "Dashboard" },
  { href: "/dashboard/badges", Icon: Label, text: "Labels" },
  { href: "/dashboard/brands", Icon: Apple, text: "Brands" },
  { href: "/dashboard/categories", Icon: Category, text: "Categories" },
  { href: "/dashboard/cities", Icon: LocationCity, text: "Cities" },
  { href: "/dashboard/colors", Icon: ColorLens, text: "Colors" },
  { href: "/dashboard/properties", Icon: EditAttributes, text: "Attributes" },
  { href: "/dashboard/products", Icon: PhoneAndroid, text: "Products" },
  { href: "/dashboard/users", Icon: People, text: "Users" },
  { href: "/dashboard/sellers", Icon: Store, text: "Sellers" },
  { href: "/dashboard/orders", Icon: ShoppingBasket, text: "Orders" },
];
