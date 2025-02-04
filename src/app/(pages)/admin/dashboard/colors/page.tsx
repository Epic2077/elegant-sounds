import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { ColorsTable } from "./colors-table";
import { getColors } from "@/app/api/dashboard/server-api/colors";

export default async function ColorsPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const colors = await getColors(params);
  return (
    <TableContainer title="colors" createLink="/admin/dashboard/colors/create">
      <ColorsTable colors={colors} />
    </TableContainer>
  );
}
