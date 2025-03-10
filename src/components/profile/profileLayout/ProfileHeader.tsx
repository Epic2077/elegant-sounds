"use client";

import React from "react";
import { Bell, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import Profile from "@/components/home-components/header/Profile";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ProfileHeader() {
  return (
    <div className="flex flex-row bg-muted items-center px-6 w-full h-[60px]">
      <SidebarTrigger />
      <Logo />
      <div className="ml-auto flex items-center h-[60px] flex-row gap-5">
        <div className="h-[50%] w-[2px] bg-gray-400"></div>
        <Mail className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <div className="h-[50%] w-[2px] bg-gray-400"></div>
        <Profile bg="primary" />
      </div>
    </div>
  );
}
