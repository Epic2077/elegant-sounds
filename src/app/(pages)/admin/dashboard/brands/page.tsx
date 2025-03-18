import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { BrandsTable } from "./brands-table";
import { getBrands } from "@/app/api/dashboard/server-api/brands";

export default async function BrandsPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const brands = getBrands(params);
  return (
    <TableContainer title="brands" createLink="/admin/dashboard/brands/create">
      <BrandsTable brands={brands} />
    </TableContainer>
  );
}
