import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { getProductById } from "@/app/api/shop/server-api/products";
import AddPrice from "@/components/seller/forms/AddPrice";
import { Card, CardContent } from "@/components/ui/card";

export default async function AddProductPrice({ params }: ServerPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <h4 className="text-3xl font-semibold">
            <span className="text-primary">Add Price To:</span>{" "}
            {product.titleEn} <br />
          </h4>

          <AddPrice defaultValue={product} />
        </CardContent>
      </Card>
    </div>
  );
}
