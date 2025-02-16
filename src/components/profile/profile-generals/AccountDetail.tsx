"use client";

import { Card } from "@/components/ui/card";
import { useUserInfo } from "@/utils/userContext";
import { Edit } from "lucide-react";
import React from "react";

const AccountDetail = () => {
  const { profile, user } = useUserInfo();

  let firstName;
  let LastName;

  if (user?.role === 3) {
    firstName = user?.firstName;
    LastName = user?.lastName;
  } else {
    firstName = profile?.firstName;
    LastName = profile?.lastName;
  }

  const AccountDetail = [
    {
      title: "First Name",
      value: firstName,
    },
    {
      title: "Last Name",
      value: LastName,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Role",
      value: user?.role === 3 ? "admin" : user?.role === 2 ? "Seller" : "user",
    },
  ];
  return (
    <Card className="w-[450px] h-[280px] bg-muted rounded-xl shadow-lg shadow-black mt-2 p-4">
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-lg">Account Details</h3>
        <Edit className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="mt-10 grid gap-6">
        {AccountDetail.map((detail) => (
          <div className="flex justify-between items-center" key={detail.title}>
            <p className="text-sm text-muted-foreground">{detail.title}</p>
            <p className="text-sm">{detail.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AccountDetail;
