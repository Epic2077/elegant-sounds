"use client";
import { deletePropertyAction } from "@/app/actions/property";
import {
  IProperty,
  IPropertyOption,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import Link from "next/link";

export function PropertiesTable({
  properties,
}: {
  properties: PaginatedResultApi<IProperty>;
}) {
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/admin/dashboard/properties/update/" + p.id}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteAlertDialog
              onConfirm={async () => deletePropertyAction(p.id)}
            >
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip>
        </Stack>
      )}
      subTable={{
        header: "Suggested Options",
        key: "options",
        schema: [
          {
            title: "Id",
            render: (row: IPropertyOption) => row.id,
          },
          {
            title: "Label",
            render: (row) => row.label,
          },
          {
            title: "Value",
            render: (row) => row.value,
          },
        ],
      }}
      data={properties}
      schema={[
        {
          title: "Id",
          render: (row) => row.id,
        },
        {
          title: "Name",
          render: (row) => row.name,
        },
        {
          title: "Label",
          render: (row) => row.label,
        },
        {
          title: "Type",
          render: (row) => row.type,
        },
      ]}
    />
  );
}
