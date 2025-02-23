"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/utils/userContext";
import { AudioLines, Edit, Mail, MapPin, Phone, Shield } from "lucide-react";
import React from "react";

const ProfileCard = () => {
  const { profile, user } = useUserInfo();

  // Handle first and last name based on user role
  const firstName =
    profile?.firstName !== undefined ? profile?.firstName : user?.firstName;
  const lastName =
    profile?.lastName !== undefined ? profile?.lastName : user?.lastName;

  // Handle address logic
  const address =
    profile?.addressList?.length ?? 0 > 0
      ? profile?.addressList[0].address
      : "No Address Set";

  const phone =
    profile?.phoneNumber?.length ?? 0 > 0
      ? profile?.phoneNumber
      : "No Phone Number Set";

  // Format createdAt date
  const createdAt = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="w-full min-w-[350px] max-w-sm sm:max-w-md md:max-w-lg bg-muted rounded-xl shadow-lg  p-6 py-0">
      <CardHeader className="flex justify-center items-center">
        <div className="bg-primary flex justify-center items-center rounded-full h-24 w-24 p-2 shadow-md">
          <AudioLines />
        </div>
      </CardHeader>
      <CardContent className="text-center mt-2">
        <h2 className="text-2xl font-semibold text-muted-foreground">{`${firstName} ${lastName}`}</h2>
        <div className="bg-card rounded-full px-4 py-1 mt-2 inline-block">
          <p className="text-sm text-muted-foreground">
            Created At: <span className="text-primary">{createdAt}</span>
          </p>
        </div>
        <div className="w-full h-[1px] bg-muted-foreground my-8"></div>
        <div className="space-y-3 text-left gap-2 flex flex-col">
          <div className="flex items-center gap-3 border p-2 rounded-xl border-muted-foreground bg-secondary">
            <Phone className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">{phone}</p>
          </div>
          <div className="flex items-center gap-3 border p-2 rounded-xl border-muted-foreground bg-secondary">
            <MapPin className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">{address}</p>
          </div>
          <div className="flex items-center gap-3 border p-2 rounded-xl border-muted-foreground bg-secondary">
            <Mail className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3 border p-2 rounded-xl border-muted-foreground bg-secondary">
            <Shield className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground capitalize">
              {user?.role === 3
                ? "Admin"
                : user?.role === 2
                ? "Seller"
                : "User"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 mt-5 mx-auto bg-primary"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
