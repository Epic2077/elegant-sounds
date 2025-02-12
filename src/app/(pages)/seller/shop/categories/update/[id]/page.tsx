import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { getCategoryById } from "@/app/api/shop/server-api/categories";
import CategoryForm from "@/components/seller/forms/CategoryForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function UpdateCategory({ params }: ServerPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const category = await getCategoryById(id);
  return (
    <div className="max-w-[80%] mx-auto">
      <Card>
        <CardContent>
          <h5>Edit Category</h5>
          <CategoryForm defaultValue={category} />
        </CardContent>
      </Card>
    </div>
  );
}
