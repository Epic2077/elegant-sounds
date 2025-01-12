import Logo from "@/components/Logo";
import React from "react";
import { Navigation } from "./Navigation";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="w-full h-[60px] flex items-center bg-transparent px-4 md:px-8 lg:px-32">
      <div id="logo" className="flex-shrink-0">
        <Logo />
      </div>
      <div id="navbar" className="mx-auto hidden md:block">
        <Navigation />
      </div>
      <div id="profile">
        <Profile />
      </div>
    </div>
  );
};

export default Header;
