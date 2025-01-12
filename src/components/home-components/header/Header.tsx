import Logo from "@/components/Logo";
import React from "react";
import { Navigation } from "./Navigation";

const Header = () => {
  return (
    <div className="w-full h-[60px] flex items-center bg-transparent px-32">
      <div id="logo">
        <Logo />
      </div>
      <div id="navbar" className="mx-auto">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
