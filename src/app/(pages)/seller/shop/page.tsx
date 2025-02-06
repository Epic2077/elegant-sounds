"use client";
import { OverviewStat } from "@/components/seller/charts/OverviewStat";
import { PieChartStat } from "@/components/seller/charts/PieChart";
import Status from "@/components/seller/overview/Status";
import { Input } from "@/components/ui/input";
import { useUserInfo } from "@/utils/userContext";
import React from "react";

const Shop = () => {
  const { user } = useUserInfo();
  console.log(user);
  return (
    <div className=" py-1">
      <div className="flex justify-between items-center space-y-4">
        <h1 className="text-4xl font-bold">
          {!!user ? user?.firstName + "'s" : "Your"} Shop
        </h1>
        <Input className="w-72" placeholder="Search..." />
      </div>
      <div className="space-y-2">
        <Status />
      </div>
      <div className="flex mt-6 gap-6">
        <div className="mx-auto">
          <OverviewStat />
        </div>
        <div>
          <PieChartStat />
        </div>
      </div>
    </div>
  );
};

export default Shop;
