"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Edit } from "lucide-react";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const PaymentMethodDetail = () => {
  // Mock payment method data (replace with actual data from your context/API)

  const paymentMethod = useAppSelector((state) => state.paymentMethods);

  const paymentDetails = paymentMethod
    ? [
        {
          title: "Payment Method",
          value: paymentMethod.methods[0].type || "N/A",
        },
        {
          title: "Card Holder",
          value: paymentMethod.methods[0].cardHolder || "N/A",
        },
        {
          title: "Expiry Date",
          value: paymentMethod.methods[0].expiry || "N/A",
        },
        {
          title: "Card Number",
          value: paymentMethod.methods[0].last4
            ? `**** **** **** ${paymentMethod.methods[0].last4.slice(-4)}`
            : "N/A",
        },
      ]
    : [
        { title: "Payment Method", value: "Unknown" },
        { title: "Card Holder", value: "Unknown" },
        { title: "Expiry Date", value: "Unknown" },
        { title: "Card Number", value: "Unknown" },
      ];

  return (
    <Card className="w-full min-h-full max-w-md bg-secondary rounded-xl shadow-lg p-6">
      <CardHeader className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-secondary-foreground">
          Payment Method
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-gray-700"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </CardHeader>
      <div className="w-full h-[2px] bg-muted-foreground"></div>
      <CardContent className="mt-6">
        {paymentMethod ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-tr from-primary/50 to-primary/100 w-full h-48 rounded-xl p-4 text-foreground flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <CreditCard className="w-8 h-8" />
                <p className="text-sm">
                  {paymentMethod.methods[0].type || "Card"}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-center mb-10">
                  **** **** ****{" "}
                  {paymentMethod.methods[0].last4.slice(-4) || "****"}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm">
                    {paymentMethod.methods[0].cardHolder || "N/A"}
                  </p>
                  <p className="text-sm">
                    Exp: {paymentMethod.methods[0].expiry || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {paymentDetails.map((detail) => (
                <div
                  key={detail.title}
                  className="flex justify-between items-center"
                >
                  <p className="text-sm text-muted-foreground font-medium">
                    {detail.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <CreditCard className="w-8 h-8 mb-2" />
            <p className="text-sm">No payment method added yet.</p>
            <Button variant="outline" className="mt-4 rounded-lg">
              Add Payment Method
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodDetail;
