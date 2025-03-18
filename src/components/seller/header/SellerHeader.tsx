import React from "react";
import SellerNavigation from "./navigation";
import Logo from "@/components/Logo";
import Profile from "@/components/home-components/header/Profile";

const SellerHeader = () => {
  return (
    <div className="w-[95%] mx-auto my-4 ">
      <div className="px-2 border border-primary rounded-lg flex justify-between items-center">
        <SellerNavigation />
        <div className="flex gap-4 items-center">
          <Logo />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default SellerHeader;
