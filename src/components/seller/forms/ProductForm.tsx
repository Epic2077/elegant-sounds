"use client";

import { ICategory, IProduct } from "@/app/api/dashboard/server-api/types";
import { createOrUpdateProductAction } from "@/app/api/shop/actions/products";
import { useActionState } from "react";
import SingleUpload from "../upload/SingleUpload";
import CategoryField from "../fields/CategoryField";

type ProductFormProps = {
  defaultValue?: IProduct;
};

function ProductForm({ defaultValue }: ProductFormProps) {
  const [state, action] = useActionState(createOrUpdateProductAction, {
    message: "",
    success: false,
  });

  return (
    <form action={action}>
      {defaultValue?.id && (
        <input hidden name="id" defaultValue={defaultValue.id} />
      )}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-row gap-2">
          <SingleUpload
            name="images.main"
            defaultValue={defaultValue?.images.main}
          />
          <SingleUpload
            name="images.list"
            multi
            defaultValue={defaultValue?.images.list}
          />
        </div>
        <div className="flex flex-row gap-2">
          <CategoryField
            name="category"
            defaultValue={defaultValue?.category ?? ({} as ICategory)}
          />
        </div>
      </div>
    </form>
  );
}
