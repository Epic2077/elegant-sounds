"use client";
import {
  IUser,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import AITable from "@/components/dashboard/tables/AITable";
import { Edit } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { use } from "react";

export function UsersTable({
  users,
}: {
  users: Promise<PaginatedResultApi<IUser>>;
}) {
  const allUsers = use(users);
  return (
    <>
      <AITable
        actions={(p) => (
          <Stack direction={"row"}>
            <Tooltip title="Edit">
              <IconButton
                color="secondary"
                component={Link}
                href={"/admin/dashboard/users/update/" + p.id}
              >
                {p.role !== 3 && <Edit />}
              </IconButton>
            </Tooltip>
          </Stack>
        )}
        data={allUsers}
        schema={[
          {
            title: "Id",
            render: (row) => row.id,
          },
          {
            title: "Email",
            render: (row) => row.email,
          },
          {
            title: "Status",
            render: (row) => (row.isActive ? "Active" : "DeActive"),
          },
          {
            title: "Role",
            render: (row) => RoleMap[row.role - 1],
          },
        ]}
      />
    </>
  );
}
const RoleMap = ["Buyer", "Seller", "Admin"];
