import { Boxes, CreditCardIcon, DollarSign, Package } from "lucide-react";
import React from "react";
import StatusCard from "../charts/StatusCard";

const FakeData = [
  {
    title: "Total Revenue",
    value: "$50,000.89",
    icon: <DollarSign />,
  },
  {
    title: "Categories",
    value: "+5",
    icon: <Boxes />,
  },
  {
    title: "Total Products",
    value: "+12",
    icon: <Package />,
  },
  {
    title: "Sales",
    value: "+100",
    icon: <CreditCardIcon />,
  },
];
const Status = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {FakeData.map((data, index) => (
        <StatusCard key={index} {...data} />
      ))}
    </div>
  );
};

export default Status;
