import Logo from "@/components/Logo";
import React from "react";
import { Navigation } from "./Navigation";
import Profile from "./Profile";
import Burger from "./BurgerMenu";

const Header = () => {
  return (
    <div className="w-full h-[60px] flex items-center bg-background px-4 md:px-8 lg:px-32 fixed sm:relative justify-between">
      <div id="logo" className="flex-shrink-0">
        <Logo />
      </div>
      <div id="navbar" className=" hidden md:block">
        <Navigation />
      </div>
      <div id="profile">
        <Profile />
      </div>
      <div id="burger" className="sm:block md:hidden lg:hidden">
        <Burger />
      </div>
    </div>
  );
};

export default Header;
