import ProfileCard from "@/components/profile/profile-generals/ProfileCard";
import React from "react";

export default function Profile() {
  return (
    <div className="grid mt-2">
      <h1 className="font-bold text-3xl ">Profile</h1>
      <div className="flex mt-5">
        <ProfileCard />
      </div>
    </div>
  );
}
