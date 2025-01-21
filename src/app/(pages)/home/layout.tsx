import Footer from "@/components/home-components/Footer/Footer";
import Header from "@/components/home-components/header/Header";
import React from "react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative">
      <header className=" relative z-20">
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default layout;
