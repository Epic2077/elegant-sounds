import QueryProvider from "@/components/dashboard/QueryProvider";
import Footer from "@/components/home-components/Footer/Footer";
import Header from "@/components/home-components/header/Header";

import React from "react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative overflow-x-hidden">
      <header className=" relative z-20">
        <div className=" z-30">
          <Header />
        </div>
      </header>
      <QueryProvider>
        <main>{children}</main>
      </QueryProvider>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default layout;
