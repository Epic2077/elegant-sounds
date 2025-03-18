import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSub,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Burger = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="px-4">
          <MenuIcon className="h-6 w-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:w-48 md:w-72 lg:w-80">
        <DropdownMenuLabel className="text-center">
          Navigation
        </DropdownMenuLabel>
        <DropdownMenuGroup className="flex flex-col gap-4">
          <DropdownMenuSeparator />
          <Link href="/home">
            <DropdownMenuItem className="text-base">Home</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-base">
              Shop
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40 sm:w-48 md:w-56 lg:w-64">
                <Link href="/auth/login">
                  <DropdownMenuItem className="text-base">
                    example
                  </DropdownMenuItem>
                </Link>
                <Link href="/auth/signup">
                  <DropdownMenuItem className="text-base">
                    example2
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-base">
              Product
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40 sm:w-48 md:w-56 lg:w-64">
                <Link href="/auth/login">
                  <DropdownMenuItem className="text-base">
                    example
                  </DropdownMenuItem>
                </Link>
                <Link href="/auth/signup">
                  <DropdownMenuItem className="text-base">
                    example2
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Burger;
