import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Boxes, ChartLine, ShoppingCart, Speaker } from "lucide-react";
import Link from "next/link";
import React from "react";

const SellerNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenu>
          <Link href="/seller/shop" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} gap-2`}
            >
              <ChartLine className="text-primary" />
              Overview
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
        <NavigationMenu>
          <Link href="/seller/shop/products" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} gap-2`}
            >
              <Speaker className="text-primary" />
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
        <NavigationMenu>
          <Link href="/seller/shop/categories" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} gap-2`}
            >
              <Boxes className="text-primary" />
              Categories
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
        <NavigationMenu>
          <Link href="/seller/shop/orders" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} gap-2`}
            >
              <ShoppingCart className="text-primary" />
              Orders
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SellerNavigation;
