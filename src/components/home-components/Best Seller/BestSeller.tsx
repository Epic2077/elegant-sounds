import React from "react";
import Header4 from "../Header4";
import RightToLeftFade from "@/widget/animations/rightToLeftFade-Animation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import HomeCards from "../Home-Cards";

const fakeSeller = [
  {
    id: 1,
    brand: "Sony",
    name: "WH-1000XM5",
    price: 299.99,
    img: "/images/BestSeller/sony-wh-1000xm5.png",
    category: "Wireless Headphones",
  },
  {
    id: 2,
    brand: "Beats",
    name: "Studio Pro",
    price: 349.99,
    img: "/images/BestSeller/beats-studio-pro.png",
    category: "Wireless Headphones",
  },
  {
    id: 3,
    brand: "Sony",
    name: "WH-CH720N",
    price: 329.99,
    img: "/images/BestSeller/sony-wh-ch720n.png",
    category: "Wireless Headphones",
  },
  {
    id: 4,
    brand: "SkullCandy",
    name: "Rail True",
    price: 399.99,
    img: "/images/BestSeller/skullcandy-rail-true.png",
    category: "Wireless Headphones",
  },
  {
    id: 5,
    brand: "Beats",
    name: "Studio Pro Earbuds",
    price: 549.99,
    img: "/images/BestSeller/beats-earbuds.png",
    category: "Earbuds",
  },
  {
    id: 6,
    brand: "JBL",
    name: "Reflect Flow Pro +",
    price: 249.99,
    img: "/images/BestSeller/jbl-reflect-flow-pro+.png",
    category: "Earbuds",
    off: 50,
  },
  {
    id: 7,
    brand: "Bose",
    name: "QuiteComfort",
    price: 299.99,
    img: "/images/BestSeller/bose-quite-comfort.png",
    category: "Wireless Headphones",
  },
  {
    id: 8,
    brand: "AKG",
    name: "Y600NC",
    price: 499.99,
    img: "/images/BestSeller/akg-y600nc.png",
    category: "Wireless Headphones",
  },
];

const BestSeller = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Header4 title="Best Seller" />
        <RightToLeftFade>
          <InteractiveHoverButton className="text-sm">
            Show All
          </InteractiveHoverButton>
        </RightToLeftFade>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {fakeSeller.map((product) => (
          <HomeCards
            key={product.id}
            product={product}
            status="Hot"
            off={!!product.off}
            offPercentage={product.off || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
