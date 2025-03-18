import React from "react";
import * as motion from "motion/react-client";

const Grow = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full h-[450px] bg-muted flex rounded-3xl"
    >
      {children}
    </motion.div>
  );
};

export default Grow;
