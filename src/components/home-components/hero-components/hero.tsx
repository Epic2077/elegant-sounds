import React from "react";
import { WavyBackground } from "../../ui/wavy-background";
import HeroContent from "./HeroContent";

export function Hero() {
  return (
    <WavyBackground className="max-w-7xl mx-auto" speed="fast">
      <HeroContent />
    </WavyBackground>
  );
}
