import React from "react";
import * as motion from "motion/react-client";

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full md:w-auto"
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
