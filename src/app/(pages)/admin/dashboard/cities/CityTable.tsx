"use client";
import { Edit, Delete } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { use } from "react";
import Link from "next/link";
import {
  ICity,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";
import { deleteCityAction } from "@/app/actions/city";

export default function CityTable({
  cities,
}: {
  cities: Promise<PaginatedResultApi<ICity>>;
}) {
  const allCity = use(cities);
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/admin/dashboard/cities/update/" + p.id}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <DeleteAlertDialog
              onConfirm={async () => {
                deleteCityAction(p.id);
              }}
            >
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip>
        </Stack>
      )}
      data={allCity}
      schema={[
        {
          title: "id",
          render: (row) => row.id,
        },
        {
          title: "City Code",
          render: (row) => row.slug,
        },
        {
          title: "Name",
          render: (row) => row.name,
        },
        {
          title: "City Phone Code",
          render: (row) => row.code,
        },
        {
          title: "Created At",
          render: (row) => new Date(row.createdAt).toLocaleDateString("en"),
        },
        {
          title: "Last Update",
          render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
        },
      ]}
    />
  );
}
