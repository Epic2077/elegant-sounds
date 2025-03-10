import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { ProductTable } from "./page-table";
import { getProducts } from "@/app/api/shop/server-api/products";

export default async function CategoryPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const products = await getProducts(params);
  return (
    <TableContainer
      title="Products"
      createLink="/admin/dashboard/products/create"
    >
      <ProductTable products={products} />
    </TableContainer>
  );
}
