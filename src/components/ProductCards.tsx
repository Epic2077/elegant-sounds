"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/widget/animations/FadeIn";
import { colors } from "@mui/material";
import { ArrowBigRightDash, Heart, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ArrivalCardsProps {
  product: IProduct;
  status?: "New" | "Hot";
  off?: boolean;
  offPercentage?: number;
}

const ProductCard: React.FC<ArrivalCardsProps> = ({
  product,
  status,
  off = false,
  offPercentage,
}) => {
  return (
    <BlurFade className="w-max mx-auto">
      <BackgroundGradient
        className="rounded-3xl w-[280px] bg-card grid gap-1 p-4 "
        containerClassName="w-max"
      >
        <div className="mb-[6px] relative w-full">
          {status && (
            <div className="absolute top-2 left-2 bg-primary py-1.5 px-4 rounded flex flex-col gap-6">
              <p className="text-xs">{status}</p>
            </div>
          )}
          {off && offPercentage !== undefined && (
            <div className="absolute top-2 left-16 bg-primary py-1.5 px-4 rounded flex flex-col gap-6">
              <span className="text-xs text-primary-foreground">
                {offPercentage}% OFF
              </span>
            </div>
          )}
          {product.colors.length > 0 && (
            <div className="absolute top-12 right-0 bg-muted p-1 py-2 rounded-full flex flex-col gap-2">
              {product.colors.map((color) => (
                <div
                  className="p-1 rounded-full"
                  key={color.id}
                  style={{ backgroundColor: color.hexCode }}
                ></div>
              ))}
            </div>
          )}

          <div
            className={cn(
              "hidden absolute top-1 right-1 bg-secondary rounded-full p-1.5 cursor-pointer",
              "group-hover:block hover:p-2 hover:top-0.5 hover:right-0.5"
            )}
          >
            <Heart className="w-5" />
          </div>

          <div
            className={cn(
              "hidden absolute bottom-2 w-[95%] h-9 mx-auto bg-transparent border-2 border-primary rounded-xl cursor-pointer",
              "group-hover:flex group-hover:items-center group-hover:justify-center hover:bg-primary hover:text-background"
            )}
          >
            <p>Add to cart</p>
          </div>

          <Image
            src={product.images.main}
            alt={product.titleEn}
            width={200}
            height={300}
            className="mx-auto object-cover w-[250px] h-[300px]"
          />
        </div>
        <div className="flex justify-between items-center">
          <ShinyButton className="w-max h-max bg-accent px-3">
            {product.brand.titleEn}
          </ShinyButton>
          <p className="whitespace-pre-wrap text-base font-medium tracking-tighter ">
            {product.bestSeller?.lastPrice !== null &&
            product.bestSeller?.lastPrice !== undefined
              ? `$${product.bestSeller.lastPrice}.00`
              : "N/A"}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-muted-foreground text-base truncate w-[98%]">
            {product.titleEn}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Link href={`/home/categories/${product.category.titleEn}`}>
            <div className="flex gap-2 items-center  ">
              <Tag className="w-5" />
              <p className="text-muted-foreground text-sm">
                {product.category.titleEn}
              </p>
            </div>
          </Link>
          <ArrowBigRightDash className="w-5 text-ring" />
        </div>
      </BackgroundGradient>
    </BlurFade>
  );
};

export default ProductCard;
