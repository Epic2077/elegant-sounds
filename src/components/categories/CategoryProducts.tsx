"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { BASE_URL } from "@/app/Base";
import ProductCard from "@/components/ProductCards";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterableProductGrid } from "../FilterTableProductGrid";

export default function CategoryProducts({}) {
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
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Category: <span className="text-foreground">{categoryName}</span>
      </h1>
      <FilterableProductGrid products={products}>
        {(filteredProducts) => (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No products found matching the filters
              </div>
            )}
          </div>
        )}
      </FilterableProductGrid>
    </div>
  );
}
