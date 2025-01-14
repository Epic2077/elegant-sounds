import { Hero } from "@/components/home-components/hero-components/hero";
import { LogoCarousel } from "@/components/home-components/logo-carousel/LogoCarousel";
import React from "react";

const Home = () => {
  return (
    <section>
      <Hero />
      <div className="w-full">
        <LogoCarousel />
      </div>
    </section>
  );
};

export default Home;
