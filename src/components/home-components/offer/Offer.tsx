import { Button } from "@/components/ui/button";
import FadeIn from "@/widget/animations/FadeIn";
import { AudioLines } from "lucide-react";
import Image from "next/image";
import React from "react";

const Offer = () => {
  return (
    <FadeIn>
      <div className="w-full h-[450px] bg-muted flex rounded-3xl">
        <div className="w-[50%] relative transition-all duration-500 ease-in-out">
          <Image
            src="/images/offer.png"
            alt="offer"
            layout="fill"
            objectFit="cover"
            className="dark:grayscale-[50%] rounded-3xl hover:mt-[-24px] hover:ml-6 transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="w-full h-full flex flex-col gap-4 px-16  justify-center">
          <p className="text-base text-primary">PROMOTION</p>
          <div className="flex gap-3 items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <AudioLines className="h-6 w-6" />
            </div>
            <h4 className="text-[35px] font-semibold">3legant Sounds</h4>
          </div>
          <h4 className="text-[40px] font-semibold  mt-3">
            Hurry Up! <span className="text-primary animate-pulse">40%</span>{" "}
            OFF
          </h4>
          <p className="text-base text-muted-foreground">
            Enjoy high-quality music streaming with our exclusive offer.
            Don&apos;t miss out on this limited-time promotion!
          </p>
          <Button className="px-6 py-2 hover:bg-primary bg-transparent text-foreground border-2 border-primary w-40 rounded-md mt-3">
            Get Started
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

export default Offer;
