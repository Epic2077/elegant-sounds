import { AudioLines } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link
          href="/home"
          className="flex items-center gap-2 font-medium --font-poppins"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <AudioLines className="size-4" />
          </div>
          3legant.
        </Link>
      </div>
    </div>
  );
};

export default Logo;
