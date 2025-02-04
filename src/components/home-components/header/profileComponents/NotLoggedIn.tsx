import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotLoggedIn = () => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Login</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent className="w-40 sm:w-48 md:w-56 lg:w-64">
            <Link href="/auth/login">
              <DropdownMenuItem>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </DropdownMenuItem>
            </Link>
            <Link href="/auth/signup">
              <DropdownMenuItem>
                <LogIn className="w-4 h-4 mr-2" />
                Sign Up
              </DropdownMenuItem>
            </Link>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
};

export default NotLoggedIn;
