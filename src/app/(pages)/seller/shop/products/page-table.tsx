"use client";

import {
  IProduct,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import SellerTable from "@/components/seller/tables/SellerTable";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

export function SProductTable({
  products,
}: {
  products: PaginatedResultApi<IProduct>;
}) {
  return (
    <SellerTable
      actions={(p) => (
        <div className="flex flex-row gap-2">
          <header className="flex items-center">
            <Link href={"/seller/shop/products/update/" + p.code}>
              <Button variant={"ghost"}>
                <h5>Edit</h5>
                <Edit className="text-primary" />
              </Button>
            </Link>
          </header>
        </div>
      )}
      data={products}
      schema={[
        {
          title: "Image",
          render: (row) => (
            <img
              src={row.images.main}
              alt="Product Image"
              style={{ width: "60px", height: "60px" }}
            />
          ),
        },
        {
          title: "Code",
          render: (row) => row.code,
        },
        {
          title: "English Title",
          render: (row) => row.titleEn,
        },
        {
          title: "Farsi Title",
          render: (row) => row.titleFa,
        },
        {
          title: "Category",
          render: (row) => row.category.titleEn,
        },
        {
          title: "Brand",
          render: (row) => row.brand.titleEn,
        },
        {
          title: "Update",
          render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
        },
      ]}
    ></SellerTable>
  );
}
