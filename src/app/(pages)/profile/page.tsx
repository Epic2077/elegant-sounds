import AccountDetail from "@/components/profile/profile-generals/AccountDetail";
import PaymentMethodDetail from "@/components/profile/profile-generals/PaymentMethodDetail";
import ProfileCard from "@/components/profile/profile-generals/ProfileCard";
import ShippingAddressDetail from "@/components/profile/profile-generals/ShippingAddressDetail";
import React from "react";

export default function Profile() {
  return (
    <div className="grid mt-2">
      <h1 className="font-bold text-3xl ">Profile</h1>
      <div className="flex mt-5 gap-8 h-max mx-auto">
        <ProfileCard />
        <div className="grid gap-12 h-full">
          <AccountDetail />
          <ShippingAddressDetail />
        </div>
        <PaymentMethodDetail />
      </div>
    </div>
  );
}
