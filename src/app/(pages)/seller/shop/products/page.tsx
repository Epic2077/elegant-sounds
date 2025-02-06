import { STableContainer } from "@/components/seller/tables/STable-container";
import React from "react";

const Products = () => {
  return (
    <STableContainer title="Products" createLink="/seller/shop/products/create">
      Products
    </STableContainer>
  );
};

export default Products;
