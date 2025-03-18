"use client";
import { Input } from "@/components/ui/input";
import { useUserInfo } from "@/utils/userContext";
import React from "react";

const OverviewHeader = () => {
  const { user, profile } = useUserInfo();
  console.log("user: ", user);
  console.log("Profile:", profile);

  return (
    <div className="flex justify-between items-center space-y-4">
      <h1 className="text-4xl font-bold">
        {!!user ? user?.firstName + "'s" : "Your"} Shop
      </h1>
      <Input className="w-72" placeholder="Search..." />
    </div>
  );
};

export default OverviewHeader;
