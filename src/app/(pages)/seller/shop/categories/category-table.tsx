"use client";

import { deleteCategoryAction } from "@/app/actions/categories";
import {
  ICategory,
  IProperty,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import SellerTable from "@/components/seller/tables/SellerTable";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export function SCategoriesTable({
  categories,
}: {
  categories: PaginatedResultApi<ICategory>;
}) {
  return (
    <SellerTable
      actions={(p) => (
        <div className="flex flex-row gap-2">
          <header className="flex items-center">
            <Link href={"/seller/shop/categories/update/" + p.id}>
              <Button variant={"ghost"}>
                <h5>Edit</h5>
                <Edit className="text-primary" />
              </Button>
            </Link>
          </header>
          <div title="Delete">
            <DeleteAlertDialog
              onConfirm={async () => deleteCategoryAction(p.id)}
            >
              <Button variant={"ghost"}>
                <h5>Delete</h5>
                <Trash className="text-primary" />
              </Button>
            </DeleteAlertDialog>
          </div>
        </div>
      )}
      subTable={{
        header: "Properties",
        key: "id",
        schema: [
          {
            title: "Number",
            render: (row: IProperty) => row.id,
          },
          {
            title: "Lable",
            render: (row) => row.label,
          },
          {
            title: "Name",
            render: (row) => row.name,
          },
          {
            title: "Type",
            render: (row) => row.type,
          },
        ],
      }}
      data={categories}
      schema={[
        {
          title: "Slug",
          render: (row) => row.slug,
        },
        {
          title: "Parent Category",
          render: (row) => row.parent?.slug ?? "-",
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
          title: "Update",
          render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
        },
      ]}
    />
  );
}
