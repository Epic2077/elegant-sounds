"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const SelectMethods = () => {
  const paymentMethod = useAppSelector((state) => state.paymentMethods);
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <Card>
      <CardContent className="mx-auto my-10 mt-5 flex flex-col gap-6">
        <h2 className="text-2xl text-primary mb-6">Select Payment Method</h2>
        <RadioGroup
          defaultValue={selectedMethod}
          onValueChange={setSelectedMethod}
          className="grid gap-4"
        >
          {paymentMethod.methods.map((option) => (
            <div key={option.type} className="flex items-center space-x-4">
              <RadioGroupItem value={option.type} id={option.type} />
              <Label
                htmlFor={option.type}
                className="flex flex-1 items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {option.cardHolder}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {option.last4.slice(0, 4)} **** ****{" "}
                      {option.last4.slice(-4)}{" "}
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SelectMethods;
