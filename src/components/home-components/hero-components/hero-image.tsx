import React from "react";
import Image from "next/image";
import LeftToRightFade from "@/widget/leftToRightFade-Animation";

const HeroImage = () => {
  return (
    <LeftToRightFade>
      <Image
        src={"/images/jbl-headphone.png"}
        alt="JBL Headphone"
        width={550}
        height={550}
        className="w-full h-auto"
      />
    </LeftToRightFade>
  );
};

export default HeroImage;
