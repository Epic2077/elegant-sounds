import { STableContainer } from "@/components/seller/tables/STable-container";
import React from "react";
import { SProductTable } from "./page-table";
import { getProducts } from "@/app/api/dashboard/server-api/products";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";

export default async function Products({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const products = await getProducts(params);
  return (
    <STableContainer title="Products" createLink="/seller/shop/products/create">
      <SProductTable products={products} />
    </STableContainer>
  );
}
