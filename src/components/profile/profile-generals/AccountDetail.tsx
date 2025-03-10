"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useUserInfo } from "@/utils/userContext";
import React from "react";

const AccountDetail = () => {
  const { profile, user } = useUserInfo();

  // Determine first and last name based on role
  const firstName =
    profile?.firstName == undefined ? user?.firstName : profile?.firstName;
  const lastName =
    profile?.lastName == undefined ? user?.lastName : profile?.lastName;

  // Define account details array
  const accountDetails = [
    { title: "First Name", value: firstName || "N/A" },
    { title: "Last Name", value: lastName || "N/A" },
    { title: "Email", value: user?.email || "N/A" },
    {
      title: "Role",
      value: user?.role === 3 ? "Admin" : user?.role === 2 ? "Seller" : "User",
    },
  ];

  return (
    <Card className="w-full max-w-md bg-card rounded-xl shadow-lg p-2">
      <CardHeader className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-foreground">
          Account Details
        </h3>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid gap-4">
          {accountDetails.map((detail) => (
            <div
              key={detail.title}
              className="flex justify-between items-center"
            >
              <p className="text-sm text-primary font-medium">{detail.title}</p>
              <p className="text-sm text-foreground">{detail.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountDetail;
