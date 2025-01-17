import { Hero } from "@/components/home-components/hero-components/hero";
import { LogoCarousel } from "@/components/home-components/logo-carousel/LogoCarousel";
import NewArrivals from "@/components/home-components/newArrivals/NewArrivals";
import React from "react";

const Home = () => {
  return (
    <section>
      <Hero />
      <div className="w-full">
        <LogoCarousel />
      </div>
      <section className="px-28 mt-12">
        <NewArrivals />
      </section>
    </section>
  );
};

export default Home;
