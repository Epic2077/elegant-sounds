"use client";

import * as React from "react";
import {
  AudioLines,
  Badge,
  BookOpen,
  Box,
  Boxes,
  Building2,
  Crown,
  Frame,
  Heart,
  LayoutDashboard,
  Link,
  LogOut,
  Map,
  PaintbrushVertical,
  PenTool,
  PieChart,
  Settings2,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Speaker,
  Store,
  User,
  User2,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavProjects } from "./NavItems";
import { useUserInfo } from "@/utils/userContext";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Navigation",
      url: "/home",
      icon: Link,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/home",
          icon: AudioLines,
        },
        {
          title: "Shop",
          url: "/shop",
          icon: Store,
        },
        {
          title: "categories",
          url: "/categories",
          icon: Boxes,
        },
        {
          title: "About Me",
          url: "/aboutme",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "User",
      url: "/profile",
      icon: User,
      items: [
        {
          title: "Wishlist",
          url: "/wishlist",
          icon: Heart,
        },
        {
          title: "Cart",
          url: "/cart",
          icon: ShoppingCart,
        },
        {
          title: "Orders",
          url: "/orders",
          icon: ShoppingBag,
        },
      ],
    },
    {
      title: "Settings",
      url: "/profile",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/profile",
          icon: PenTool,
        },
        {
          title: "Billing",
          url: "/profile/billing",
          icon: Wallet,
        },
      ],
    },
  ],
  Admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "Badges",
          url: "/dashboard/badges",
          icon: Badge,
        },
        {
          title: "Brands",
          url: "/dashboard/brands",
          icon: Crown,
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: Boxes,
        },
        {
          title: "Cities",
          url: "/dashboard/cities",
          icon: Building2,
        },
        {
          title: "Colors",
          url: "/dashboard/colors",
          icon: PaintbrushVertical,
        },
        {
          title: "Properties",
          url: "/dashboard/properties",
          icon: Box,
        },
        {
          title: "Products",
          url: "/dashboard/products",
          icon: Speaker,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: User2,
        },
        {
          title: "Sellers",
          url: "/dashboard/sellers",
          icon: Store,
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: ShoppingBasket,
        },
      ],
    },
  ],
  Seller: [
    {
      title: "Design Engineering",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "Sales & Marketing",
          url: "#",
          icon: PieChart,
        },
        {
          title: "Travel",
          url: "#",
          icon: Map,
        },
      ],
    },
  ],
  Logout: [{ title: "Logout", url: "/logout", icon: LogOut }],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAdmin, isSeller } = useUserInfo();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {isAdmin && <NavMain headerTitle="Admin" items={data.Admin} />}
        {isSeller && <NavMain headerTitle="Shop" items={data.Seller} />}

        <NavMain headerTitle="" items={data.Logout} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
