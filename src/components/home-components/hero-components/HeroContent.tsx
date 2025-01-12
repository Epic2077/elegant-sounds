import React from "react";
import Highlight from "../../ui/highlight";
import { Button } from "../../ui/button";
import HeroImage from "./hero-image";
import * as motion from "motion/react-client";

function HeroContent() {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center w-full">
      <HeroImage />
      <div className="flex-1 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-[80px] w-full md:w-[538px]">
            Listen to <br className="mb-3" />
            the <Highlight>amazing</Highlight>
            <br className="mb-3" /> music sound.
          </h1>
          <p className="text-balance text-lg text-muted-foreground mt-2">
            Experience music like never before.{" "}
          </p>

          <Button className="mt-4 bg-primary px-10">Shop Now</Button>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroContent;
