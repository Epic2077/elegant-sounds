import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { STableContainer } from "@/components/seller/tables/STable-container";
import { SCategoriesTable } from "./category-table";
import { getCategories } from "@/app/api/shop/server-api/categories";

export default async function CategoryPage({ searchParams }: ServerPageProps) {
  const params = await searchParams;
  const categories = await getCategories(params);
  return (
    <STableContainer
      title="Categories"
      createLink="/seller/shop/categories/create"
    >
      <SCategoriesTable categories={categories} />
    </STableContainer>
  );
}
