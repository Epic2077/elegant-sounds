import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { getProductById } from "@/app/api/user/products";
import ProductDetailComponent from "@/components/product-details/ProductDetail";
import ProductImages from "@/components/product-details/ProductImages";
import { ProductProperties } from "@/components/product-details/ProductProperties";
import React from "react";

const ProductDetail = async ({ params }: ServerPageProps) => {
  const { id } = await params;
  const product = await getProductById({ id });

  return (
    <div className="min-h-screen px-4 py-12 mt-6 md:mt-0 md:px-8 lg:px-20 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
        <div className="w-full lg:w-1/3">
          <ProductImages product={product} />
        </div>
        <div className="w-full lg:w-2/3">
          <ProductDetailComponent product={product} />
        </div>
      </div>
      <ProductProperties products={product} />
    </div>
  );
};

export default ProductDetail;
