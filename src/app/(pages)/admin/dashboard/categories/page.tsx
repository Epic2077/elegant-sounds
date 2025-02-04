import { TableContainer } from "@/components/dashboard/tables/TableContainer";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { CategoriesTable } from "./category-table";
import { getCategories } from "@/app/api/dashboard/server-api/categories";

export default async function CategoryPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const categories = await getCategories(params);
  return (
    <TableContainer
      title="Categories"
      createLink="/admin/dashboard/categories/create"
    >
      <CategoriesTable categories={categories} />
    </TableContainer>
  );
}
