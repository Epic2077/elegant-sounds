import CategoryForm from "@/components/seller/forms/CategoryForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function CreateCity() {
  return (
    <div className="max-w-[80%] mx-auto">
      <Card className="">
        <CardContent className="py-4">
          <h5>Add New Category</h5>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
