"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    name: "HeadPhone",
    description:
      "Experience the best sound quality with our top-of-the-line headphones.",
    href: "/headphones",
    cta: "Shop now",
    background: (
      <Image
        src="/images/collection/headphone.png"
        alt="headphone"
        width={470}
        height={480}
        className="mx-auto "
      />
    ),
    className:
      "row-span-2 row-start-1 row-end-3 col-start-1 col-end-5  sm:col-end-2 lg:col-end-4 h-full",
  },
  {
    name: "Earbuds",
    description:
      "Discover the freedom of wireless sound with our premium earbuds.",
    href: "/earbuds",
    cta: "Shop now",
    background: (
      <Image
        src="/images/collection/earbuds.png"
        alt="earbuds"
        width={400}
        height={400}
        className="ml-auto"
      />
    ),
    className:
      "col-start-1 col-end-2 sm:col-start-3 sm:col-end-4 sm:row-start-1 lg:col-start-4 lg:col-end-5",
  },
  {
    name: "Accessories",
    description:
      "Find the perfect accessories to complement your audio experience.",
    href: "/accessories",
    cta: "Shop now",
    background: (
      <Image
        src="/images/collection/accessory.png"
        alt="accessories"
        width={400}
        height={400}
        className="ml-auto"
      />
    ),
    className:
      "col-start-1 col-end-2 sm:col-start-3 sm:col-end-4 lg:col-start-4 lg:col-end-5",
  },
];

export function Bento() {
  return (
    <BentoGrid className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[665px]">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={cn(features[0].className)}
      >
        <BentoCard key={features[0].name} {...features[0]} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={features[1].className}
      >
        <BentoCard key={features[1].name} {...features[1]} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={features[2].className}
      >
        <BentoCard key={features[2].name} {...features[2]} />
      </motion.div>
    </BentoGrid>
  );
}
