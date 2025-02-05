import SellerHeader from "@/components/seller/header/SellerHeader";
import React from "react";

async function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <header className="w-full grid ">
        <SellerHeader />
      </header>
      <main>{children}</main>
    </section>
  );
}

export default SellerLayout;
