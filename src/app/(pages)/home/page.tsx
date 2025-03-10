import Cursor from "@/components/cursor";
import BestSeller from "@/components/home-components/Best Seller/BestSeller";
// import Category from "@/components/home-components/Categories/Categories";
import Collection from "@/components/home-components/collection/Collection";
import { Hero } from "@/components/home-components/hero-components/hero";
import { LogoCarousel } from "@/components/home-components/logo-carousel/LogoCarousel";
import NewArrivals from "@/components/home-components/newArrivals/NewArrivals";
import Offer from "@/components/home-components/offer/Offer";
import Values from "@/components/home-components/Values/Values";
import React from "react";

const Home = async () => {
  return (
    <section className="grid gap-12 w-screen">
      <Cursor />

      <Hero />
      <div className="w-screen">
        <LogoCarousel />
      </div>
      <section className="px-4 sm:px-8 md:px-16 lg:px-28 flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-28">
        {/* <Category /> */}
        <NewArrivals />
        <div>
          <Collection />
        </div>
        <BestSeller />
        <Offer />
        <Values />
      </section>
    </section>
  );
};

export default Home;
