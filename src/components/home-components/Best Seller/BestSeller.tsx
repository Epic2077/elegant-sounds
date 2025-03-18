"use client";

import React, { useEffect, useState } from "react";
import Header4 from "../Header4";
import RightToLeftFade from "@/widget/animations/rightToLeftFade-Animation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { IProduct } from "@/app/api/dashboard/server-api/types";
import ProductCard from "@/components/ProductCards";
import { BASE_URL } from "@/app/Base";

const BestSeller = () => {
  const [hot, setHot] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        // Filter products by the “new arrival” badge
        const filtered =
          data.results?.filter((product: IProduct) =>
            product.badges?.some((b) => b.title?.toLowerCase() === "hot")
          ) || [];
        // Show first 4
        setHot(filtered.slice(0, 8));
      } catch (err) {
        console.error("Failed fetching new arrivals", err);
      }
    })();
  }, []);

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
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-center">
        {hot.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
