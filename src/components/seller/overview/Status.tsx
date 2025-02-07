import { Boxes, CreditCardIcon, DollarSign, Package } from "lucide-react";
import React from "react";
import StatusCard from "../charts/StatusCard";
import { getProducts } from "@/app/api/dashboard/server-api/products";
import { getCategories } from "@/app/api/dashboard/server-api/categories";
import { getOrders } from "@/app/api/dashboard/server-api/orders";

const Status = async () => {
  const products = await getProducts();
  const productAmount = products.results.length;

  const categories = await getCategories();
  const categoryAmount = categories.results.length;

  const orders = await getOrders();
  const orderAmount = orders.results.length;

  const FakeData = [
    {
      title: "Total Revenue",
      value: "$50,000.89",
      icon: <DollarSign />,
    },
    {
      title: "Categories",
      value: `+ ${categoryAmount}`,
      icon: <Boxes />,
    },
    {
      title: "Total Products",
      value: `+ ${productAmount}`,
      icon: <Package />,
    },
    {
      title: "Sales",
      value: `+ ${orderAmount}`,
      icon: <CreditCardIcon />,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {FakeData.map((data, index) => (
        <StatusCard key={index} {...data} />
      ))}
    </div>
  );
};

export default Status;
