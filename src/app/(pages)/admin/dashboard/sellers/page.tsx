import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { SellerTable } from "./seller-table";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { getAllSellers } from "@/app/api/dashboard/server-api/sellers";

export default async function UsersPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const sellers = getAllSellers(params);
  return (
    <TableContainer
      title="Sellers"
      createLink="/admin/dashboard/sellers/create"
    >
      <SellerTable sellers={sellers} />
    </TableContainer>
  );
}
