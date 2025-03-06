import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Banknote,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfileDetail = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  return (
    <div>
      <DropdownMenuGroup>
        <Link href="/profile">
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="#">
          <DropdownMenuItem>
            <Banknote className="w-4 h-4 mr-2" />
            Billing
          </DropdownMenuItem>
        </Link>
        <Link href="#">
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Setting
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="#">
          <DropdownMenuItem>
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </DropdownMenuItem>
        </Link>
        <Link href="/cart">
          <DropdownMenuItem>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
          </DropdownMenuItem>
        </Link>
        <Link href="/home/orders">
          <DropdownMenuItem>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Orders
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </div>
  );
};

export default ProfileDetail;
