"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode, useEffect, useState } from "react";

interface FilterableProductGridProps {
  products: IProduct[];
  children: (filteredProducts: IProduct[]) => ReactNode;
}

export function FilterableProductGrid({
  products,
  children,
}: FilterableProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Get unique categories and brands
  const categories = Array.from(
    new Set(products.map((product) => product.category?.titleEn))
  ).filter(Boolean);
  const brands = Array.from(
    new Set(products.map((product) => product.brand?.titleEn))
  ).filter(Boolean);

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    products,
  ]);

  const applyFilters = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.titleFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.titleEn?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category?.titleEn === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.brand?.titleEn === selectedBrand
      );
    }

    if (minPrice) {
      filtered = filtered.filter(
        (product) =>
          product.bestSeller?.lastPrice !== undefined &&
          product.bestSeller.lastPrice >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) =>
          product.bestSeller?.lastPrice !== undefined &&
          product.bestSeller.lastPrice <= Number(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Render Children with filtered products */}
      {children(filteredProducts)}
    </div>
  );
}
