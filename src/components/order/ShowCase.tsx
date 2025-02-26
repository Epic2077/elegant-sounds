"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

const ShowCase = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className="bg-muted rounded-2xl grid grid-cols-2 gap-10 p-6">
      {cart.items.map((item) => (
        <div key={item.code} className="flex flex-row items-center gap-4">
          <Image src={item.image} width={100} height={100} alt={item.title} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm">Quantity: {item.quantity}</p>
            <p className="text-sm">Price: {item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowCase;
