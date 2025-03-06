"use client";

import {
  IOrder,
  IOrderItem,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import SellerTable from "@/components/seller/tables/SellerTable";
import { use } from "react";

export function SOrderTable({
  orders,
}: {
  orders: Promise<PaginatedResultApi<IOrder>>;
}) {
  const allOrders = use(orders);
  return (
    <>
      <SellerTable
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
            title: "city",
            render: (row) => row.shippingAddress.city,
          },
        ]}
        subTable={{
          header: "Item",
          key: "id",
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
export const RoleMap = ["User", "Seller", "Admin"];
