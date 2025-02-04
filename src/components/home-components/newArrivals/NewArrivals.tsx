import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import RightToLeftFade from "@/widget/animations/rightToLeftFade-Animation";
import React from "react";
import HomeCards from "../Home-Cards";
import Header4 from "../Header4";

const NewArrivals = () => {
  const fakeArrivals = [
    {
      brand: "Skullcandy",
      name: "Crusher anc 2 wireless headphones",
      price: 299.99,
      img: "/images/Arrivals/skullcandy-crusher.png",
      category: "Wireless Headphones",
      id: 1,
    },
    {
      brand: "Beats",
      name: "Studio Pro",
      price: 349.99,
      img: "/images/Arrivals/beats-studio-pro.png",
      category: "Wireless Headphones",
      id: 2,
    },
    {
      brand: "Sony",
      name: "WH-CH720N",
      price: 149.99,
      img: "/images/Arrivals/sony-wh-ch720n.png",
      category: "Wireless Headphones",
      id: 3,
    },
    {
      brand: "SkullCandy",
      name: "Rail True Wireless",
      price: 79.99,
      img: "/images/Arrivals/skullcandy-rail-true.png",
      category: "Earbuds",
      id: 4,
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-between">
        <Header4 title="New Arrivals" />
        <RightToLeftFade>
          <InteractiveHoverButton className="text-sm">
            Show All
          </InteractiveHoverButton>
        </RightToLeftFade>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 justify-center lg:grid-cols-4 gap-6 mt-12">
        {fakeArrivals.map((product) => (
          <HomeCards key={product.id} product={product} status="New" />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
