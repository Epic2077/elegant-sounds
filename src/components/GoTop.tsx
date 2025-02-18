"use client";

import { CircleFadingArrowUp } from "lucide-react";
import React from "react";

const GoTop = () => {
  return (
    <div className="hidden z-20 lg:block w-9">
      <CircleFadingArrowUp
        className="text-primary"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default GoTop;
