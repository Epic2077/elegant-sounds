"use client";
import { deleteBrandAction } from "@/app/actions/brands";
import {
  IBrand,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";
import { Edit, Delete } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { use } from "react";

export function BrandsTable({
  brands,
}: {
  brands: Promise<PaginatedResultApi<IBrand>>;
}) {
  const brandsList = use(brands);
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/admin/dashboard/brands/update/" + p.id}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title="delete">
            <DeleteAlertDialog onConfirm={async () => deleteBrandAction(p.id)}>
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip>
        </Stack>
      )}
      data={brandsList}
      schema={[
        {
          title: "slug",
          render: (row) => row.slug,
        },
        {
          title: "English Title",
          render: (row) => row.titleEn,
        },
        {
          title: "Frasi Title",
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
