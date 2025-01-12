import { AudioLines } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link
          href="/home"
          className="flex items-center gap-2 font-medium text-lg md:text-xl --font-poppins"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <AudioLines className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">3legant.</span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
