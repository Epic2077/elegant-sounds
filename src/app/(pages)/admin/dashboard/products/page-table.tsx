"use client";
// import { deleteProductAction } from "@/app/actions/products";
import {
  IProduct,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
// import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import Link from "next/link";

export function ProductTable({
  products,
}: {
  products: PaginatedResultApi<IProduct>;
}) {
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/admin/dashboard/products/update/" + p.code}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Delete">
            <DeleteAlertDialog
              onConfirm={async () => deleteProductAction(p.id)}
            >
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip> */}
        </Stack>
      )}
      data={products}
      schema={[
        {
          title: "Code",
          render: (row) => row.code,
        },
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
    />
  );
}
