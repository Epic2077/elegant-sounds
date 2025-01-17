import React from "react";
import * as motion from "motion/react-client";

const BottomToTopFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-auto"
    >
      {children}
    </motion.div>
  );
};

export default BottomToTopFade;
