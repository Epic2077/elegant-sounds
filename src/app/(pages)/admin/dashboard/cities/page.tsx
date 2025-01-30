"use server";
import { getCities } from "@/app/api/dashboard/server-api/city";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import CityTable from "./CityTable";

export default async function Cities({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const cities = getCities(params);
  return (
    <TableContainer title="City" createLink="/admin/dashboard/cities/create">
      <CityTable cities={cities} />
    </TableContainer>
  );
}
