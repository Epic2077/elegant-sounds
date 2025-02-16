import { Card } from "@/components/ui/card";
import React from "react";

const ShippingAddressDetail = () => {
  return (
    <Card className="w-[450px] h-[280px] bg-muted rounded-xl shadow-lg shadow-black mt-2 p-4">
      <div className="grid justify-center items-center h-full w-full">
        <h3>--- No Information available For Shipping Address ---</h3>
      </div>
    </Card>
  );
};

export default ShippingAddressDetail;
