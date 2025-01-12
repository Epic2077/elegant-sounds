import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image";

const HeroImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-auto"
    >
      <Image
        src={"/images/jbl-headphone.png"}
        alt="JBL Headphone"
        width={550}
        height={550}
        className="w-full h-auto"
      />
    </motion.div>
  );
};

export default HeroImage;
