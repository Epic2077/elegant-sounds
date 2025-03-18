"use client";

import { ICategory, IProduct } from "@/app/api/dashboard/server-api/types";
import { createOrUpdateProductAction } from "@/app/api/shop/actions/products";
import { useActionState, useState } from "react";
import SingleUpload from "../upload/SingleUpload";
import CategoryField from "../fields/CategoryField";
import BadgeField from "../fields/BadgeField";
import ColorsField from "../fields/ColorsField";
import AIForm from "./AIForm";
import { Separator } from "@radix-ui/react-separator";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import BrandField from "../fields/BranField";

type ProductFormProps = {
  defaultValue?: IProduct;
};

function ProductForm({ defaultValue }: ProductFormProps) {
  const [state, action] = useActionState(createOrUpdateProductAction, {
    message: "",
    success: false,
  });

  const [category, setCategory] = useState<ICategory | null>(
    defaultValue?.category ?? null
  );

  return (
    <form action={action}>
      {defaultValue?.id && (
        <input hidden name="id" defaultValue={defaultValue.id} />
      )}
      {state.message && (
        <div className="bg-destructive text-destructive-foreground p-2">
          {state.message}
        </div>
      )}
      <div className="flex flex-col gap-6 mt-2">
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
        <div className="flex flex-row gap-12 w-full">
          <CategoryField
            name="category"
            defaultValue={defaultValue?.category}
            onChange={setCategory}
          />
          <BrandField defaultValue={defaultValue?.brand} name="brand" />
        </div>
        <div className="flex flex-row gap-12">
          <BadgeField defaultValue={defaultValue?.badges} name="badges" />
          <ColorsField defaultValue={defaultValue?.colors} name="colors" />
        </div>
        <AIForm
          schema={[
            {
              name: "code",
              type: "number",
              label: "Code",
              defaultValue: defaultValue?.code,
              error: !!state.errors?.code,
              helperText: state.errors?.code,
            },
            {
              name: "titleEn",
              label: "English Title",
              size: 6,
              type: "string",
              defaultValue: defaultValue?.titleEn,
              error: !!state.errors?.titleEn,
              helperText: state.errors?.titleEn,
            },
            {
              name: "titleFa",
              label: "Farsi Title",
              size: 6,
              type: "string",
              defaultValue: defaultValue?.titleFa,
              error: !!state.errors?.titleFa,
              helperText: state.errors?.titleFa,
            },
            {
              name: "review",
              label: "Review",
              type: "textarea",
              defaultValue: defaultValue?.review,
              error: !!state.errors?.review,
              helperText: state.errors?.review,
            },
            {
              name: "expert_review",
              label: "ٍExpert Review",
              type: "textarea",
              defaultValue: defaultValue?.expert_review,
              error: !!state.errors?.expert_review,
              helperText: state.errors?.expert_review,
            },
          ]}
        />
        <Separator />
        <p className="font-semibold text-xl">Properties (Choose Category)</p>
        {category?.properties.map((item, i) => (
          <div key={item.id} className="flex gap-2">
            <input
              hidden
              name={`properties[${i}].name`}
              defaultValue={item.name}
            />
            <input
              hidden
              defaultValue={item.label}
              name={`properties[${i}].label`}
            />
            <div>
              {item.options?.length ? (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Select
                      name={`specifications.${i}.value`}
                      defaultValue={
                        defaultValue?.specifications.find(
                          (spec) => spec.name === item.name
                        )?.value ?? ""
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Please Choose An Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          Please Choose An Option
                        </SelectItem>
                        {item.options.map((o) => (
                          <SelectItem key={o.id} value={o.value}>
                            {o.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      name={`specifications.${i}.value`}
                      defaultValue={
                        defaultValue?.specifications.find(
                          (spec) => spec.name === item.name
                        )?.value
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            </div>
          </div>
        ))}
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}

export default ProductForm;
