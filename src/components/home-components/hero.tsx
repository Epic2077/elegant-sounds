import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import Image from "next/image";
import Highlight from "../ui/highlight";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <WavyBackground className="max-w-7xl mx-auto" speed="fast">
      <div className="flex flex-col md:flex-row gap-5 items-center w-full">
        <div className="w-full md:w-auto">
          <Image
            src={"/images/jbl-headphone.png"}
            alt="JBL Headphone"
            width={550}
            height={550}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-[80px] w-full md:w-[538px]">
            Listen to <br className="mb-3" />
            the <Highlight>amazing</Highlight>
            <br className="mb-3" /> music sound.
          </h1>
          <p className="text-balance text-lg text-muted-foreground mt-2">
            Experience music like never before.{" "}
          </p>
          <Button className="mt-4 bg-primary px-10">Shop Now</Button>
        </div>
      </div>
    </WavyBackground>
  );
}
