import { Boxes, CreditCardIcon, DollarSign, Package } from "lucide-react";
import React from "react";
import StatusCard from "../charts/StatusCard";
import { getCategories } from "@/app/api/shop/server-api/categories";
import { getOrders } from "@/app/api/shop/server-api/orders";
import { getProducts } from "@/app/api/shop/server-api/products";

const Status = async () => {
  const products = await getProducts();
  // console.log(products);
  const productAmount = products.results.length || 0;

  const categories = await getCategories();
  // console.log(categories);
  const categoryAmount = categories.results.length;

  const orders = await getOrders();
  console.log("Orders:", orders);
  const orderAmount = orders.results?.length || 0;

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
