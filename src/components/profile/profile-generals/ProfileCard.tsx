"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { useUserInfo } from "@/utils/userContext";
import { CardContent } from "@mui/material";
import { Edit, Mail, MapPin, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const { profile, user } = useUserInfo();
  let firstName;
  let LastName;
  let address;
  if (user?.role === 3) {
    firstName = user?.firstName;
    LastName = user?.lastName;
  } else {
    firstName = profile?.firstName;
    LastName = profile?.lastName;
  }
  if (!profile?.addressList) {
    address = "No Address Found";
  } else if (profile?.addressList.length > 0) {
    address = profile?.addressList[0].address;
  } else {
    address = "No Address Set";
  }
  return (
    <Card className="w-[350px] bg-accent rounded-xl shadow-lg shadow-black mt-2 pb-2">
      <CardHeader className="p-6 pb-1 flex justify-center items-center">
        <div className="bg-primary flex justify-center items-center rounded-3xl h-max w-max p-5 shadow-lg shadow-black">
          <Image
            src="/user.svg"
            alt="profile"
            className="rounded-3xl"
            width={200}
            height={150}
          />
        </div>
      </CardHeader>
      <CardContent className="grid justify-center">
        <h2 className="text-2xl font-light text-center">{`${firstName} ${LastName}`}</h2>

        <div className=" bg-background rounded-full p-1 px-4 flex items-center justify-center  mx-auto mt-4">
          <p className="text-foreground">
            Created At:{" "}
            <span className="text-primary">
              {profile?.createdAt.slice(0, 10)}
            </span>
          </p>
        </div>
        <div className="w-[350px] h-[2px] bg-muted-foreground my-6"></div>
        <div className="grid gap-4 justify-center">
          <div className="flex gap-3 mt-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm">{address}</p>
          </div>
          <div className="flex gap-3 mt-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm">{user?.email}</p>
          </div>
          <div className="flex gap-3 mt-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm">
              {user?.role === 3
                ? "admin"
                : user?.role === 2
                ? "Seller"
                : "user"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mx-auto mt-8">
          <Edit className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Edit Profile</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
