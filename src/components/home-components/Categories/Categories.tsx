import { ShinyButton } from "@/components/ui/shiny-button";
import React from "react";

const categories = [
  "Headphone",
  "Speaker",
  "Earbuds",
  "Wireless",
  "Soundbar",
  "Subwoofer",
  "Amplifier",
  "Turntable",
  "DAC",
  "Receiver",
  "Microphone",
  "Mixer",
  "Bluetooth Adapter",
  "Streaming Device",
  "Accessories",
];
const Category = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 mx-28">
      {categories.map((c) => (
        <ShinyButton
          key={c}
          className="bg-secondary flex justify-center items-start"
        >
          {c}
        </ShinyButton>
      ))}
    </div>
  );
};

export default Category;
