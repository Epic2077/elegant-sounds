"use client";
import { deleteColorAction } from "@/app/actions/colors";
import {
  IColor,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import Link from "next/link";

export function ColorsTable({
  colors,
}: {
  colors: PaginatedResultApi<IColor>;
}) {
  return (
    <AITable
      actions={(p) => (
        <Stack direction={"row"}>
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              component={Link}
              href={"/dashboard/colors/update/" + p.id}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteAlertDialog onConfirm={async () => deleteColorAction(p.id)}>
              <IconButton color="error">
                <Delete />
              </IconButton>
            </DeleteAlertDialog>
          </Tooltip>
        </Stack>
      )}
      data={colors}
      schema={[
        {
          title: "Id",
          render: (row) => row.id,
        },
        {
          title: "Title",
          render: (row) => row.title,
        },
        {
          title: "Color",
          render: (row) => (
            <Box sx={{ bgcolor: row.hexCode, height: 20, width: 20 }} />
          ),
        },
        {
          title: "Color HexCode",
          render: (row) => row.hexCode,
        },
        {
          title: "Update",
          render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
        },
      ]}
    />
  );
}
