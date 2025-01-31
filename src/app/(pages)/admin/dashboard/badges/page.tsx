import { getBadges } from "@/app/api/dashboard/server-api/badges";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { BadgesTable } from "./bades-table";

export default async function BadgesPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const badges = getBadges(params);
  return (
    <TableContainer title="badges" createLink="/admin/dashboard/badges/create">
      <BadgesTable badges={badges} />
    </TableContainer>
  );
}
