"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { BASE_URL } from "@/app/Base";
import ProductCard from "@/components/ProductCards";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryPage({}) {
  const { categoryName } = useParams() as { categoryName: string };
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();

      const filtered = data.results.filter(
        (item: IProduct) =>
          item.category?.titleEn?.toLowerCase() ===
            categoryName.toLowerCase() ||
          item.category?.slug?.toLowerCase() === categoryName.toLowerCase()
      );
      setProducts(filtered);
    }
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="mt-28 min-h-screen px-12">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Category: <span className="text-foreground">{categoryName}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
