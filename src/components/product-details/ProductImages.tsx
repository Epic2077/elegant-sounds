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
    <div className="flex flex-col gap-6 ">
      <div className="p-6 bg-muted rounded-3xl w-max justify-center items-center relative">
        <Image
          src={mainImage}
          alt={product.titleEn}
          width={300}
          height={300}
          className="mx-auto object-contain w-[400px] h-[400px]"
        />
        <div className="bg-primary py-2 px-4 rounded-2xl absolute top-3 left-3 z-30">
          {product.bestSeller?.count} Left
        </div>
      </div>
      <Carousel opts={{ align: "center" }} className="flex gap-2">
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <Card className="border-primary rounded-3xl">
                  <CardContent
                    className="flex aspect-square items-center justify-center p-2"
                    onClick={() => setMainImage(image)}
                  >
                    <Image
                      src={image}
                      alt={index.toString()}
                      width={60}
                      height={60}
                      className="object-contain w-[60px] h-[60px]"
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
