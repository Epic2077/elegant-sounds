"use client";

import {
  IProduct,
  ISpecification,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import SellerTable from "@/components/seller/tables/SellerTable";
import { Button } from "@/components/ui/button";
import { Check, CircleDollarSign, Edit, X } from "lucide-react";
import Image from "next/image";
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
            <Link href={`/seller/shop/products/${p.code}/price/`}>
              <Button variant={"ghost"}>
                <h5>Price</h5>
                <CircleDollarSign className="text-primary" />
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
            <Link href={`/shop/product/${row.code}`} target="_blank">
              <Image
                src={row.images.main}
                alt="Product Image"
                style={{ width: "60px", height: "60px" }}
                width={60}
                height={60}
              />
            </Link>
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
          title: "Badges",
          render: (row) =>
            row.badges.length !== 0
              ? row.badges.map((b) => b.title).join(", ")
              : "-",
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
          title: "Colors",
          render: (row) => (
            <div className="flex gap-2">
              {row.colors.map((color) => (
                <div
                  key={color.id}
                  className="p-2 rounded-full border-foreground border"
                  style={{ backgroundColor: color.hexCode }}
                ></div>
              ))}
            </div>
          ),
        },
        {
          title: "Created At",
          render: (row) => new Date(row.createdAt).toLocaleDateString("en"),
        },
        {
          title: "Update",
          render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
        },
        {
          title: "Price",
          render: (row) => (row.bestSeller ? row.bestSeller.price : "N/A"),
        },
      ]}
      subTable={{
        header: "Specification",
        key: "specifications",
        schema: [
          {
            title: "Number",
            render: (row: ISpecification) => row.id,
          },
          {
            title: "Title",
            render: (row) => row.title,
          },
          {
            title: "Name",
            render: (row) => row.name,
          },
          {
            title: "Default",
            render: (row) =>
              row.isDefault ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-destructive" />
              ),
          },
        ],
      }}
    ></SellerTable>
  );
}
