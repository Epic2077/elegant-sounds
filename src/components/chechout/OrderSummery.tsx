"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { updateQuantity } from "@/redux/features/cartSlice";
import { Input } from "../ui/input";
import { Minus, Plus } from "lucide-react";

const OrderSummery = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl text-primary mb-6">Order Summary</h2>
        <div className="flex flex-col gap-6">
          {cart.items.map((item) => (
            <div
              key={item.code}
              className="flex flex-row justify-between items-center border-b-2 border-muted pb-4"
            >
              <div className="flex flex-row gap-4 ">
                <div className="p-2 rounded-2xl bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base">{item.title}</p>
                  <div className="flex items-center gap-2 bg-muted p-1 rounded-xl">
                    <p className="text-sm">Color:</p>
                    <div
                      className="p-2 rounded-full"
                      style={{ background: item.color }}
                    ></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(
                              updateQuantity({
                                code: item.code,
                                quantity: item.quantity - 1,
                              })
                            );
                          }
                        }}
                        className="h-7 w-7"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity >= 1) {
                            dispatch(
                              updateQuantity({
                                code: item.code,
                                quantity: newQuantity,
                              })
                            );
                          }
                        }}
                        className="w-14 text-center h-8"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              code: item.code,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="h-7 w-7"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  Price: <span>{(item.quantity * item.price).toFixed(2)}</span>
                </p>
              </div>
            </div>
          ))}
          <div className="py-4 border-b-2 border-muted flex justify-between px-4 items-center">
            Shipping: <span>{subtotal > 300 ? "FREE" : "20$"}</span>
          </div>
          <div className="pb-4 border-b-2 border-muted flex justify-between px-4 items-center">
            SubTotal: <span>{subtotal}.00 $</span>
          </div>
          <div className="pb-4 border-muted flex justify-between px-4 items-center">
            Total: <span>{subtotal + (subtotal < 300 ? 20 : 0)}.00 $</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummery;
