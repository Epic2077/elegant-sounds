"use client";

import {
  IBadge,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import AITable from "@/components/dashboard/tables/AITable";
import { Edit, Delete } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { use } from "react";
import AlertDialog from "@/components/dashboard/DeleteAlertDialog";
import { deleteBadgeAction } from "@/app/actions/badges";

export function BadgesTable({
  badges,
}: {
  badges: Promise<PaginatedResultApi<IBadge>>;
}) {
  const allBadges = use(badges);
  return (
    <>
      <AITable
        actions={(p) => (
          <Stack direction={"row"}>
            <Tooltip title="Edit">
              <IconButton
                color="secondary"
                component={Link}
                href={"/admin/dashboard/badges/update/" + p.id}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <AlertDialog onConfirm={async () => deleteBadgeAction(p.id)}>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </AlertDialog>
            </Tooltip>
          </Stack>
        )}
        data={allBadges}
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
            title: "icon",
            render: (row) => (
              <img
                src={row.icon}
                alt="Product Image"
                style={{ width: "50px", height: "50px" }}
              />
            ),
          },
          {
            title: "Update",
            render: (row) => new Date(row.updatedAt).toLocaleDateString("en"),
          },
        ]}
      />
    </>
  );
}
