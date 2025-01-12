import React from "react";
import * as motion from "motion/react-client";

const LeftToRightFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-auto"
    >
      {children}
    </motion.div>
  );
};

export default LeftToRightFade;
