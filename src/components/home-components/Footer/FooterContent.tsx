import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const FooterContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
      <div className="flex gap-4 md:gap-8 h-max items-center">
        <Logo textClassName="text-white" />
        <div className="w-[2px] h-6 bg-muted-foreground"></div>
        <p className="text-base text-white ml-2">Music Devices Store</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
        <Link href={"/home"}>
          <h6 className="text-white">Home</h6>
        </Link>
        <Link href={"/shop"}>
          <h6 className="text-white">Shop</h6>
        </Link>
        <Link href={"/category"}>
          <h6 className="text-white">Categories</h6>
        </Link>
        <Link href={"/me"}>
          <h6 className="text-white">About Me</h6>
        </Link>
      </div>
    </div>
  );
};

export default FooterContent;
