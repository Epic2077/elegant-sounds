"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { Card, CardContent } from "../ui/card";
import ProductPropertiesTable from "./PropertyTable";

export function ProductProperties({ products }: { products: IProduct }) {
  return (
    <Card className="w-full mt-20">
      <CardContent className="w-full p-6 rounded-xl">
        {products.specifications && (
          <div className="overflow-x-auto rounded-lg border border-muted">
            <ProductPropertiesTable specifications={products.specifications} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
