"use client";

import React, { useState } from "react";
import { ShinyButton } from "../ui/shiny-button";
import { IProduct } from "@/app/api/dashboard/server-api/types";
import Link from "next/link";
import { Heart, Minus, Plus, Tag } from "lucide-react";
import SubmitButton from "../seller/SubmitButton";

const ProductDetailComponent = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const price = product.bestSeller?.lastPrice || 0;
  const totalPrice = quantity * parseFloat(price.toString());

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));

  return (
    <div className="flex flex-col  ml-6 gap-6">
      <div className="flex gap-4 items-end">
        <h1 className="text-5xl font-semibold">{product.titleEn}</h1>
        <Link
          href={`/home/categories/${product.category.titleEn}`}
          className="flex gap-2 items-center ml-4 mb-[4px]"
        >
          <Tag className="text-primary w-5 h-5" />
          <p className="text-muted-foreground">{product.category.titleEn}</p>
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <ShinyButton className="w-max h-max bg-accent px-3">
          {product.brand.titleEn}
        </ShinyButton>
      </div>
      <div className="text-2xl text-primary">
        Seller:{" "}
        {product.bestSeller !== null || undefined ? (
          <span className="text-foreground">
            {product.bestSeller?.seller.name}
          </span>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        )}
      </div>
      <div className="text-2xl text-primary">
        Total Price:
        {product.bestSeller !== null || undefined ? (
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 items-start my-10 mb-5 ml-14">
              <p className="text-foreground text-[63px]">{totalPrice}</p>
              <p className="text-xl text-foreground mt-[-20px] ml-2">.00</p>
              <p className="text-foreground text-[63px] ml-4">$</p>
            </div>
            {/* Amount Counter */}
            <div className="flex items-center gap-4 mr-14">
              <button
                onClick={handleDecrement}
                disabled={quantity === 0}
                className={`px-4 py-2 rounded-full border-2 ${
                  quantity === 0
                    ? "border-muted text-muted cursor-not-allowed"
                    : "border-primary text-primary hover:bg-accent/20"
                } transition-colors`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-foreground text-2xl w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-4 py-2 rounded-full border-2 border-primary text-primary hover:bg-accent/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-foreground text-[63px] my-10 mb-5 ml-14">N/A $</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <p className="text-2xl text-primary">Colors: </p>
        <div className="h-10 border-[2px] border-primary w-max px-6 py-4 rounded-full flex flex-row gap-4 bg-muted items-center">
          {product.colors.map((color) => (
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: color.hexCode }}
              key={color.id}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4 items-center mt-1 md:mt-2">
        {product.specifications && product.specifications.length > 0 ? (
          product.specifications.map((spec) =>
            spec.isDefault ? (
              <div
                key={spec.id}
                className="px-4 py-2 border-[2px] border-primary text-primary text-xs rounded-full"
              >
                {spec.title}:{" "}
                <span className="text-foreground text-xs">{spec.value}</span>
              </div>
            ) : null
          )
        ) : (
          <p>No specifications available.</p>
        )}
      </div>
      <div className="flex items-center mt-[50px] w-full ml-10 gap-6">
        <SubmitButton className="text-3xl py-6 px-9 w-full">
          Add To Cart
        </SubmitButton>
        <div className="py-4 px-9 items-center justify-center grid bg-background border-[2px] border-primary rounded-2xl w-6 hover:bg-primary hover:text-primary-foreground">
          <Heart className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
