"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import React, { useState } from "react";
import NotLoggedIn from "./profileComponents/NotLoggedIn";
import ProfileDetail from "./profileComponents/ProfileDetail";
import { useAuth } from "@/utils/AuthContext";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useUserInfo } from "@/utils/userContext";
import { cn } from "@/lib/utils";

const Profile = ({ bg }: { bg?: string }) => {
  const { isLoggedIn, logout } = useAuth();
  const { isUser, isAdmin, isSeller, profile } = useUserInfo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    await logout();
    setIsDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  let status;
  if (isAdmin === true) {
    status = "admin ";
  } else if (isUser === true && isAdmin === false) {
    status = "user ";
  } else if (isSeller === true && isAdmin === false) {
    status = "seller ";
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className={cn(bg && `bg-${bg}`)}>
              <UserIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" sm:w-64 md:w-72 lg:w-80">
          <DropdownMenuLabel>
            {isLoggedIn
              ? "Welcome " + status + profile?.firstName
              : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isLoggedIn ? (
            <ProfileDetail onLogoutClick={handleLogoutClick} />
          ) : (
            <NotLoggedIn />
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Profile;
