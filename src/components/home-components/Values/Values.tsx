import { HoverEffect } from "@/components/ui/card-hover-effect";
import FadeIn from "@/widget/animations/FadeIn";
import { Banknote, LockIcon, PhoneIcon, TruckIcon } from "lucide-react";
import React from "react";

const Values = () => {
  const value = [
    {
      title: "Free Shipping",
      description: "Order above $300",
      icon: <TruckIcon className="w-28 h-28 text-primary" />,
    },
    {
      title: "Money-back",
      description: "30 days guarantee",
      icon: <Banknote className="w-28 h-28 text-primary" />,
    },
    {
      title: "Secure Payments",
      description: "Secured by Stripe",
      icon: <LockIcon className="w-28 h-28 text-primary" />,
    },
    {
      title: "24/7 Support",
      description: "Phone and Email support",
      icon: <PhoneIcon className="w-28 h-28 text-primary" />,
    },
  ];

  return (
    <FadeIn>
      <div className="w-full mx-auto px-8">
        <HoverEffect items={value}></HoverEffect>
      </div>
    </FadeIn>
  );
};

export default Values;
