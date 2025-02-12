import QueryProvider from "@/components/dashboard/QueryProvider";
import SellerHeader from "@/components/seller/header/SellerHeader";
import React from "react";

async function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <section>
        <header className="w-full grid ">
          <SellerHeader />
        </header>
        <main className="px-9">{children}</main>
      </section>
    </QueryProvider>
  );
}

export default SellerLayout;
