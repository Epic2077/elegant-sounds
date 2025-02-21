"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const ProductImages = ({ product }: { product: IProduct }) => {
  const [mainImage, setMainImage] = useState(product.images.main);
  const allImages = [product.images.main, ...product.images.list];
  return (
    <div className="flex flex-col gap-6 w-full md:mb-10 lg:mb-0">
      <div className="p-4 sm:p-6 bg-muted rounded-3xl w-full max-h-[450px] max-w-[400px] mx-auto relative">
        <Image
          src={mainImage}
          alt={product.titleEn}
          width={400}
          height={400}
          className="w-full max-h-[380px] object-contain"
        />
        <div className="bg-primary py-2 px-4 rounded-2xl absolute top-3 left-3 z-30">
          {product.bestSeller?.count} Left
        </div>
      </div>
      <Carousel
        opts={{ align: "center" }}
        className="w-full max-w-[400px] max-h-450 mx-auto"
      >
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/3 lg:basis-1/3"
            >
              <div>
                <Card className="border-primary rounded-3xl">
                  <CardContent
                    className="flex aspect-square items-center justify-center p-2 cursor-pointer"
                    onClick={() => setMainImage(image)}
                  >
                    <Image
                      src={image}
                      alt={index.toString()}
                      width={60}
                      height={60}
                      className="object-contain w-full h-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductImages;
