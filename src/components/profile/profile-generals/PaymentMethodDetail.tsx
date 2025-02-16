import { Card, CardHeader } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { Edit } from "lucide-react";
import React from "react";

const PaymentMethodDetail = () => {
  const AccountDetail = [
    {
      title: "Payment Method",
      value: "Unknown",
    },
    {
      title: "Cart Holder",
      value: "Unknown",
    },
    {
      title: "Expire",
      value: "Unknown",
    },
    {
      title: "Card Number",
      value: "Unknown",
    },
  ];
  return (
    <Card className="w-[450px]  bg-muted rounded-xl shadow-lg shadow-black mt-2 p-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Payment Method</h3>
          <Edit className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="grid justify-center">
        <div>
          <div className="bg-gradient-to-tr from-red-500 to-yellow-400 w-[85%] h-[200px] rounded-xl mx-auto">
            <div className="flex justify-center items-center h-full">
              <h4 className="text-xl text-background">
                No Payment Method Added
              </h4>
            </div>
          </div>
        </div>
        <div className="w-[450px] h-[2px] bg-muted-foreground my-8 mx-auto"></div>
        <div className="mt-8 grid gap-6 px-8">
          {AccountDetail.map((detail) => (
            <div
              className="flex justify-between items-center"
              key={detail.title}
            >
              <p className="text-sm text-muted-foreground">{detail.title}</p>
              <p className="text-sm">{detail.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodDetail;
