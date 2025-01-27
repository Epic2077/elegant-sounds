import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import React from "react";
import NotLoggedIn from "./profileComponents/NotLoggedIn";
import ProfileDetail from "./profileComponents/ProfileDetail";

const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            <UserIcon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" sm:w-64 md:w-72 lg:w-80">
        <DropdownMenuLabel>
          {!!localStorage.getItem("username")
            ? "Welcome " + localStorage.getItem("username")
            : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!!localStorage.getItem("username") ? (
          <ProfileDetail />
        ) : (
          <NotLoggedIn />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
