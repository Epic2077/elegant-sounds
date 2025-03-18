import ProductForm from "@/components/seller/forms/ProductForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function CreateProductPage() {
  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <h5 className="text-2xl font-semibold">Add New Product</h5>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
