"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import RightToLeftFade from "@/widget/animations/rightToLeftFade-Animation";
import React, { useEffect, useState } from "react";
import Header4 from "../Header4";
import ProductCard from "@/components/ProductCards";
import { IProduct } from "@/app/api/dashboard/server-api/types";
import { BASE_URL } from "@/app/Base";

const NewArrivals = () => {
  const [arrivals, setArrivals] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        // Filter products by the “new arrival” badge
        const filtered =
          data.results?.filter((product: IProduct) =>
            product.badges?.some(
              (b) => b.title?.toLowerCase() === "new arrival"
            )
          ) || [];
        // Show first 4
        setArrivals(filtered.slice(0, 4));
      } catch (err) {
        console.error("Failed fetching new arrivals", err);
      }
    })();
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {arrivals.map((product: IProduct, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
