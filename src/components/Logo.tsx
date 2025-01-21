import { cn } from "@/lib/utils";
import { AudioLines } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ textClassName }) => {
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
          <h5 className={cn("hidden sm:inline", textClassName)}>3legant.</h5>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
