"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SubmitButton from "../seller/SubmitButton";
import { useAppDispatch } from "@/redux/hooks";
import { addPaymentMethod } from "@/redux/features/paymentMethodsSlice";

const PaymentMethod = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState("Visa");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [digits, setDigits] = useState("");

  function handleSubmit() {
    dispatch(
      addPaymentMethod({
        type: type,
        cardHolder: cardHolder,
        expiry: expiry,
        last4: digits,
      })
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl text-primary mb-6">Purchase Method</h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Input
              name="payment-method"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="card-holder">Card Holder Name</Label>
            <Input
              name="card-holder"
              type="text"
              placeholder="Card Holder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="expiry">Expiry</Label>
            <Input
              name="expiry"
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="digits">Digits</Label>
            <Input
              name="digits"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={digits}
              onChange={(e) => setDigits(e.target.value)}
            />
          </div>
          <SubmitButton onClick={handleSubmit}>Save Method</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
