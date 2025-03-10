"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { BASE_URL } from "@/app/Base";
import { FilterableProductGrid } from "@/components/FilterTableProductGrid";
import { CustomPagination } from "@/components/pagination";
import ProductCard from "@/components/ProductCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewArrivalProducts({}) {
  const { badgeName } = useParams() as { badgeName: string };
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();

      // Filter products that have "new-arrival" in their badges
      const filtered =
        data.results?.filter((item: IProduct) =>
          item.badges?.some(
            (b: { title?: string; slug?: string }) =>
              b.title?.toLowerCase() === badgeName.replace("-", " ")
          )
        ) || [];

      setProducts(filtered);
    }
    fetchProducts();
  }, [badgeName]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="mt-14 px-12 py-6">
      <div className="bg-[url(/images/banner.jpg)] bg-no-repeat bg-center w-full h-80 rounded-2xl flex flex-col items-center justify-center mb-10">
        <h1 className="text-5xl font-bold mb-4">
          {badgeName.replace("-", " ").toUpperCase()}
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/home/shop/b">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/home/shop/new-arrival">
                New Arrival
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <FilterableProductGrid products={products}>
        {(filteredProducts) => {
          // Apply pagination to the filtered products
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = filteredProducts.slice(
            indexOfFirstItem,
            indexOfLastItem
          );

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-center">
                {currentItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center text-muted-foreground">
                    No products found matching the filters
                  </div>
                )}
              </div>

              {/* Pagination */}
              <CustomPagination
                totalItems={filteredProducts.length} // Use filteredProducts.length for total items
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </>
          );
        }}
      </FilterableProductGrid>
    </div>
  );
}
