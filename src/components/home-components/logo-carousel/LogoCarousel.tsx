"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-logo";

export function LogoCarousel() {
  return (
    <div className="h-36 rounded-md flex flex-col antialiased bg-background items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    image: "/logo/products/pioneer.svg",
    name: "Pioneer",
  },
  {
    image: "/logo/products/apple.svg",
    name: "Apple",
  },
  {
    image: "/logo/products/beats-by-dre.svg",
    name: "Beats By Dre",
  },
  {
    image: "/logo/products/bose-better-logo.svg",
    name: "Jane Austen",
  },
  {
    image: "/logo/products/sennheiser-3.svg",
    name: "Sennheiser",
  },
  {
    image: "/logo/products/sony-music.svg",
    name: "Sony Music",
  },
  {
    image: "/logo/products/audio-technica.svg",
    name: "Audio Tech",
  },
];
