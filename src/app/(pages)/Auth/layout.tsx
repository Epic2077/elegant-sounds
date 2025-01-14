import { AudioLines } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <header>
        <div className="absolute top-10 left-10 z-20">
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
      </header>
      <main>{children}</main>
    </section>
  );
};

export default layout;
