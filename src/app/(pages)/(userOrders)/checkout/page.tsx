import ContactInfo from "@/components/chechout/ContactInfo";
import FinishOrder from "@/components/chechout/FinishOrder";
import OrderSummery from "@/components/chechout/OrderSummery";
import PaymentMethod from "@/components/chechout/PaymentMethod";
import React from "react";

const Checkout = () => {
  return (
    <div className="container w-[95%] py-10 mt-10 mx-auto min-h-screen flex flex-col ">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center my-6">
        Checkout
      </h1>
      <div className="flex flex-row gap-4 mx-auto mb-12 my-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-card border-2 border-card-foreground text-foreground rounded-full flex justify-center items-center">
            1
          </div>
          <h2 className="text-2xl">Cart Items</h2>
        </div>
        <div className="w-36 h-[2px] bg-muted-foreground"></div>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary text-card rounded-full flex justify-center items-center">
            2
          </div>
          <h2 className="text-2xl">checkout</h2>
        </div>
        <div className="w-36 h-[2px] bg-muted-foreground"></div>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-card border-2 border-card-foreground text-foreground rounded-full flex justify-center items-center">
            3
          </div>
          <h2 className="text-2xl">Order Complete</h2>
        </div>
      </div>
      <FinishOrder />
      <div className="flex gap-10 justify-center">
        <div className="flex flex-col gap-6 w-1/3">
          <ContactInfo />
        </div>
        <div className="flex flex-col gap-6 w-1/3">
          <OrderSummery />
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
