import BestSeller from "@/components/home-components/Best Seller/BestSeller";
import Collection from "@/components/home-components/collection/Collection";
import { Hero } from "@/components/home-components/hero-components/hero";
import { LogoCarousel } from "@/components/home-components/logo-carousel/LogoCarousel";
import NewArrivals from "@/components/home-components/newArrivals/NewArrivals";
import Offer from "@/components/home-components/offer/Offer";
import React from "react";

const Home = () => {
  return (
    <section className="grid gap-12">
      <Hero />
      <div className="w-full">
        <LogoCarousel />
      </div>
      <section className="px-28 flex flex-col gap-28">
        <NewArrivals />

        <Collection />

        <BestSeller />

        <Offer />
      </section>
    </section>
  );
};

export default Home;
