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
      <section className="px-28">
        <NewArrivals />
      </section>
      <section className="mt-16">
        <Offer />
      </section>
    </section>
  );
};

export default Home;
