"use client";

import React, { useState, useEffect } from "react";
import NotificationBar from "./NotificationBar";
import { Navigation } from "./Navigation";
import Profile from "./Profile";
import Logo from "@/components/Logo";
import Burger from "./BurgerMenu";

const Header = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Debounce scroll events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const hasScrolled = window.scrollY > 10;
        setShowNotification(!hasScrolled);
        setIsScrolled(hasScrolled);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed w-full top-0 left-0 z-50">
      {/* Notification Bar with smooth transition */}
      {window.location.pathname.includes("home") && (
        <div
          className={`transition-all duration-300 ease-out overflow-hidden hidden md:block ${
            showNotification ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <NotificationBar />
        </div>
      )}

      {/* Main Header with shadow transition */}
      <div
        className={`bg-background transition-all duration-300 ease-out ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="h-[60px] flex items-center px-4 md:px-8 lg:px-32 justify-between mx-auto">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:block">
            <Navigation />
          </div>

          <div className="flex items-center gap-4">
            <Profile />
            <div className="sm:block md:hidden lg:hidden">
              <Burger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
