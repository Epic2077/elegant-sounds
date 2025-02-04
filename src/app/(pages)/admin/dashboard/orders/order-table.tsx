"use client";
import {
  IOrder,
  IOrderItem,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import AITable from "@/components/dashboard/tables/AITable";
import { use } from "react";
export function OrdersTable({
  orders,
}: {
  orders: Promise<PaginatedResultApi<IOrder>>;
}) {
  const allOrders = use(orders);
  return (
    <>
      <AITable
        data={allOrders}
        schema={[
          {
            title: "Id",
            render: (row) => row.id,
          },
          {
            title: "User",
            render: (row) => row.user.email,
          },
          {
            title: "Status",
            render: (row) => row.orderStatus,
          },
          {
            title: "City",
            render: (row) => row.shippingAddress.city,
          },
        ]}
        subTable={{
          header: "Order List",
          key: "orderItems",
          schema: [
            {
              title: "Item",
              render: (row: IOrderItem) => row.productSeller.product.titleEn,
            },
            {
              title: "Seller",
              render: (row: IOrderItem) => row.seller.name,
            },
            {
              title: "Quantity",
              render: (row: IOrderItem) => row.quantity,
            },
            {
              title: "Price",
              render: (row: IOrderItem) => row.productSeller.price,
            },
          ],
        }}
      />
    </>
  );
}
export const RoleMap = ["مشتری", "فروشنده", "ادمین"];
