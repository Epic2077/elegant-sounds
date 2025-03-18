import React from "react";
import FooterContent from "./FooterContent";
import BottomBar from "./BottomBar";

const Footer = () => {
  return (
    <div className="w-full h-auto py-8 px-4 sm:px-8 md:px-16 lg:px-32 bg-chart-1 dark:bg-secondary">
      <FooterContent />
      <div className="mt-8">
        <div className="w-full h-[1px] bg-muted-foreground mb-4"></div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Footer;
