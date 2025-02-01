"use client";
import { deleteCategoryAction } from "@/app/actions/categories";
import {
  ICategory,
  IProperty,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";

import { Edit, Delete } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";

export function CategoriesTable({
  categories,
}: {
  categories: PaginatedResultApi<ICategory>;
}) {
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/admin/dashboard/categories/update/" + p.id}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteAlertDialog
              onConfirm={async () => deleteCategoryAction(p.id)}
            >
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip>
        </Stack>
      )}
      subTable={{
        header: "Properties",
        key: "properties",
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
