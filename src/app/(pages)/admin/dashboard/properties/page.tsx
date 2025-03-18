"use server";
import React from "react";
import { PropertiesTable } from "./PropertiesTable";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { getProperties } from "@/app/api/dashboard/server-api/property";

export default async function Properties({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const properties = await getProperties(params);
  return (
    <TableContainer
      title="Properties"
      createLink="/admin/dashboard/properties/create"
    >
      <PropertiesTable properties={properties} />
    </TableContainer>
  );
}
