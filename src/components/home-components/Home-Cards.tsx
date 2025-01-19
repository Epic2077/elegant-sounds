"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";
import FadeIn from "@/widget/animations/FadeIn";
import { ArrowBigRightDash, Heart, Tag } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Product {
  brand: string;
  name: string;
  price: number;
  img: string;
  category: string;
  id: number;
}

interface ArrivalCardsProps {
  product: Product;
  status?: "New" | "Hot";
}

const HomeCards: React.FC<ArrivalCardsProps> = ({
  product,
  status = "New",
}) => {
  return (
    <FadeIn>
      <BackgroundGradient
        className="rounded-3xl w-[280px] bg-card grid gap-1 p-4 "
        containerClassName="w-max"
      >
        <div className="mb-[6px] relative w-full">
          <div className="absolute top-2 left-2 bg-primary py-1.5 px-4 rounded">
            <p className="text-xs">{status}</p>
          </div>

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
            src={product.img}
            alt={product.name}
            width={200}
            height={300}
            className="mx-auto"
          />
        </div>
        <div className="flex justify-between items-center">
          <ShinyButton className="w-max h-max bg-accent px-3">
            {product.brand}
          </ShinyButton>
          <p className="whitespace-pre-wrap text-base font-medium tracking-tighter ">
            ${product.price}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-muted-foreground text-base truncate w-[98%]">
            {product.name}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 items-center  ">
            <Tag className="w-5" />
            <p className="text-muted-foreground text-sm">{product.category}</p>
          </div>
          <ArrowBigRightDash className="w-5 text-ring" />
        </div>
      </BackgroundGradient>
    </FadeIn>
  );
};

export default HomeCards;
