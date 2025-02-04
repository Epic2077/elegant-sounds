"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AudioLines } from "lucide-react";
import { useUserInfo } from "@/utils/userContext";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Headphones",
    href: "/shop/categories/headphones",
    description: "High-quality headphones for an immersive audio experience.",
  },
  {
    title: "Speakers",
    href: "/shop/categories/speakers",
    description: "Top-notch speakers to fill your room with sound.",
  },
  {
    title: "Microphones",
    href: "/shop/categories/microphones",
    description: "Professional microphones for recording and streaming.",
  },
  {
    title: "EarBuds",
    href: "/shop/categories/audio-interfaces",
    description: "Compact and convenient earbuds for on-the-go listening.",
  },
  {
    title: "Accessories",
    href: "/shop/categories/accessories",
    description: "Essential accessories for your music devices.",
  },
  {
    title: "Show All",
    href: "/shop/categories",
    description: "Show all the categories.",
  },
];

export function Navigation() {
  const { isAdmin } = useUserInfo();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenu>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink className="from-primary to-card " asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <AudioLines className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      3legant Sounds
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Your one-stop shop for premium music devices, offering the
                      best for your audio needs.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Best Selling">
                Discover our most popular music devices products.
              </ListItem>
              <ListItem href="/shop/new-arrivals" title="New Arrivals">
                Check out the latest additions to our devices collection.
              </ListItem>
              <ListItem href="/shop/sale" title="On Sale">
                Grab the best deals on our top devices.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isAdmin && (
          <NavigationMenuItem>
            <Link href="/admin/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Me
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
