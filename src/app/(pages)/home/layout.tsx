import Header from "@/components/home-components/header/Header";
import React from "react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <body className="relative">
      <header className=" relative z-20">
        <Header />
      </header>
      <main>{children}</main>
      <footer></footer>
    </body>
  );
};

export default layout;
