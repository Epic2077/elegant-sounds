"use client";

import React, { useState } from "react";
import { ShinyButton } from "../ui/shiny-button";
import { IProduct } from "@/app/api/dashboard/server-api/types";
import Link from "next/link";
import { Heart, Minus, Plus, Tag } from "lucide-react";
import SubmitButton from "../seller/SubmitButton";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/features/cartSlice";

const ProductDetailComponent = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const price = product.bestSeller?.lastPrice || 0;
  const discount = product.bestSeller?.discount || 0;

  const totalPrice = quantity * parseFloat(price.toString());
  const discountedPrice =
    discount > 0 ? totalPrice * (1 - discount / 100) : totalPrice;

  const [selectedColor, setSelectedColor] = useState(product.colors[0].title);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));

  function handleAddToCart() {
    dispatch(
      addItem({
        code: product.code,
        title: product.titleEn,
        price: discountedPrice,
        quantity: quantity,
        color: selectedColor,
      })
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          {product.titleEn}
        </h1>
        <Link
          href={`/home/categories/${product.category.titleEn}`}
          className="flex gap-2 items-center ml-0 sm:ml-4 mt-2 sm:mt-0"
        >
          <Tag className="text-primary w-5 h-5" />
          <p className="text-muted-foreground">{product.category.titleEn}</p>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <ShinyButton className="w-max h-max bg-accent px-3">
          {product.brand.titleEn}
        </ShinyButton>
      </div>
      <div className="text-xl md:text-2xl text-primary">
        Seller:{" "}
        {product.bestSeller ? (
          <span className="text-foreground">
            {product.bestSeller.seller.name}
          </span>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        )}
      </div>
      <div className="text-xl md:text-2xl text-primary">
        Total Price:
        {product.bestSeller ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div className="flex flex-row gap-1  my-6 md:my-5  items-center  ml-0 md:ml-14">
              {discount > 0 ? (
                <>
                  <p className="text-foreground text-4xl sm:text-5xl md:text-6xl">
                    {discountedPrice.toFixed(0)}
                  </p>
                  <p className="text-lg md:text-xl text-foreground mt-[-10px] md:mt-[-20px] ml-2">
                    .00
                  </p>
                  <p className="text-foreground text-4xl sm:text-5xl md:text-6xl ml-4">
                    $
                  </p>
                  <p className="text-lg md:text-lg text-muted ml-4 p-1 px-2 bg-primary rounded-xl">
                    {product.bestSeller.discount}% OFF
                  </p>
                </>
              ) : (
                <>
                  <p className="text-foreground text-4xl sm:text-5xl md:text-6xl">
                    {totalPrice}
                  </p>
                  <p className="text-lg md:text-xl text-foreground mt-[-10px] md:mt-[-20px] ml-2">
                    .00
                  </p>
                  <p className="text-foreground text-4xl sm:text-5xl md:text-6xl ml-4">
                    $
                  </p>
                </>
              )}
            </div>
            {/* Amount Counter */}
            <div className="flex items-center gap-4 mr-0 md:mr-14">
              <button
                onClick={handleDecrement}
                disabled={quantity === 0}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 ${
                  quantity === 0
                    ? "border-muted text-muted cursor-not-allowed"
                    : "border-primary text-primary hover:bg-accent/20"
                } transition-colors`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-foreground text-xl sm:text-2xl w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-primary text-primary hover:bg-accent/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-foreground text-4xl sm:text-5xl md:text-6xl my-6 md:my-10 md:mb-5 ml-0 md:ml-14">
            N/A $
          </p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-xl md:text-2xl text-primary">Colors: </p>
        <div className="h-10 border-[2px] border-primary w-max px-4 sm:px-6 py-2 sm:py-4 rounded-full flex flex-row gap-4 bg-muted items-center">
          {product.colors.map((color) => (
            <div
              className={cn("p-2 sm:p-3 rounded-full", {
                "border-[2px] border-primary": selectedColor === color.title,
              })}
              style={{ backgroundColor: color.hexCode }}
              key={color.id}
              onClick={() => setSelectedColor(color.title)}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center mt-1 md:mt-2">
        {product.specifications && product.specifications.length > 0 ? (
          product.specifications.map((spec) =>
            spec.isDefault ? (
              <div
                key={spec.id}
                className="px-3 sm:px-4 py-1 sm:py-2 border-[2px] border-primary text-primary text-xs sm:text-xs rounded-full"
              >
                {spec.title}:{" "}
                <span className="text-foreground text-xs sm:text-xs">
                  {spec.value}
                </span>
              </div>
            ) : null
          )
        ) : (
          <p>No specifications available.</p>
        )}
      </div>
      <div className="flex items-center mt-6 md:mt-4 w-full gap-4 sm:gap-6">
        <SubmitButton
          className="text-xl sm:text-2xl md:text-3xl py-4 sm:py-6 px-6 sm:px-9 w-full"
          onClick={handleAddToCart}
        >
          Add To Cart
        </SubmitButton>
        <div className="py-3 sm:py-4 px-6 sm:px-9 items-center justify-center grid bg-background border-[2px] border-primary rounded-2xl w-12 sm:w-14 hover:bg-primary hover:text-primary-foreground">
          <Heart className="w-5 sm:w-6 h-5 sm:h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
