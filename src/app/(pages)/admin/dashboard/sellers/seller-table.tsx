"use client";
// import { deleteSellerAction } from "@/app/actions/sellers";
import {
  ISeller,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
// import DeleteAlertDialog from "@/components/dashboard/DeleteAlertDialog";
import AITable from "@/components/dashboard/tables/AITable";
import { Edit, Delete } from "@mui/icons-material";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { use } from "react";

export function SellerTable({
  sellers,
}: {
  sellers: Promise<PaginatedResultApi<ISeller>>;
}) {
  const allSeller = use(sellers);
  return (
    <>
      <AITable
        actions={(p) => (
          <Stack direction={"row"}>
            <Tooltip title="Edit">
              <IconButton
                color="secondary"
                component={Link}
                href={"/admin/dashboard/sellers/update/" + p.id}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Delete">
              <DeleteAlertDialog
                onConfirm={async () => deleteSellerAction(p.id)}
              >
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </DeleteAlertDialog>
            </Tooltip> */}
          </Stack>
        )}
        data={allSeller}
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
            title: "Slug",
            render: (row) => row.slug,
          },
          {
            title: "User",
            render: (row) => row.user.email,
          },
        ]}
      />
    </>
  );
}
export const RoleMap = ["Buyer", "Seller", "Admin"];
