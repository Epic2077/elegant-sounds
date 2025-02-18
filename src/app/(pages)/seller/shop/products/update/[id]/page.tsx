import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { getProductById } from "@/app/api/shop/server-api/products";
import ProductForm from "@/components/seller/forms/ProductForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function UpdateProduct({ params }: ServerPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div>
      <Card>
        <CardContent>
          <h4 className="text-3xl font-semibold">Edit Product</h4>
          <ProductForm defaultValue={product} />
        </CardContent>
      </Card>
    </div>
  );
}
