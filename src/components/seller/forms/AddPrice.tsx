"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { createPriceAction } from "@/app/api/shop/actions/price";
import Image from "next/image";
import { useActionState } from "react";
import AIForm from "./AIForm";
import SubmitButton from "../SubmitButton";

type PriceFormProps = {
  defaultValue: IProduct;
};

function AddPrice({ defaultValue }: PriceFormProps) {
  const [state, action] = useActionState(createPriceAction, {
    message: "",
    success: false,
  });

  return (
    <form action={action}>
      {defaultValue?.code && (
        <input hidden name="code" defaultValue={defaultValue.code} />
      )}
      {state.message && (
        <div className="bg-destructive text-destructive-foreground p-2">
          {state.message}
        </div>
      )}
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-row gap-2 h-max">
          <Image
            src={defaultValue?.images.main}
            alt={defaultValue?.titleEn}
            width={200}
            height={200}
            className="w-[300px] h-[300px] rounded-2xl"
          />
          <div className="h-[300px] mx-8 w-[2px] bg-muted"></div>
          <div className="flex flex-col gap-10">
            <div className="mt-4 flex flex-row gap-4">
              <h3 className="text-xl text-primary">
                Name:{" "}
                <span className="text-foreground">{defaultValue.titleEn}</span>
              </h3>
              <p className="text-xl text-primary">
                Brand:{" "}
                <span className="text-foreground">
                  {defaultValue.brand.titleEn}
                </span>
              </p>
              <p className="text-xl text-primary">
                Category:{" "}
                <span className="text-foreground">
                  {defaultValue.category.titleEn}
                </span>
              </p>
              <p className="text-xl text-primary">
                Created At:{" "}
                <span className="text-foreground">
                  {defaultValue.createdAt.slice(0, 10)}
                </span>
              </p>
              <div className="text-xl text-primary flex items-center">
                Colors:{" "}
                <div className="text-foreground flex gap-2 ml-2">
                  {defaultValue.colors.map((color) => (
                    <div
                      className="p-1.5 rounded-full w-max h-max"
                      style={{ background: color.hexCode }}
                      key={color.id}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <AIForm
              schema={[
                {
                  name: "price",
                  type: "number",
                  label: "Price",
                  error: !!state.errors?.price,
                  helperText: state.errors?.price,
                },
                {
                  name: "discount",
                  type: "number",
                  label: "Discount",
                  error: !!state.errors?.discount,
                  helperText: state.errors?.discount,
                },
                {
                  name: "count",
                  type: "number",
                  label: "Count",
                  error: !!state.errors?.count,
                  helperText: state.errors?.count,
                },
              ]}
            />
          </div>
        </div>
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}

export default AddPrice;
