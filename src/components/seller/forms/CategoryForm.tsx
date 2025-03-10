"use client";

import { ICategory } from "@/app/api/dashboard/server-api/types";
import { createOrUpdateCategoryAction } from "@/app/api/shop/actions/categories";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import SubmitButton from "../SubmitButton";
import AIForm from "./AIForm";
import CategoryField from "../fields/CategoryField";
import PropertiesField from "../fields/Property-field";

type CategoryFormProp = {
  defaultValue?: ICategory;
};

export default function CategoryForm({ defaultValue }: CategoryFormProp) {
  const [state, action] = useActionState(createOrUpdateCategoryAction, {
    message: "",
    success: false,
  });

  return (
    <form action={action}>
      <div className="p-2 mt-2 flex flex-col gap-4">
        {defaultValue?.id && (
          <Input defaultValue={defaultValue.id} name="id" hidden />
        )}
        <CategoryField
          error={!!state?.errors?.parent}
          helperText={state?.errors?.parent}
          name="parent"
          defaultValue={defaultValue?.parent ?? ({} as ICategory)}
        />
        <PropertiesField
          name="properties"
          defaultValue={defaultValue?.properties}
        />
        <AIForm
          schema={[
            {
              name: "titleEn",
              label: "English Name",
              type: "string",
              defaultValue: defaultValue?.titleEn,
              error: !!state.errors?.titleEn,
              helperText: state.errors?.titleEn,
            },
            {
              name: "titleFa",
              label: "Farsi Name",
              type: "string",
              defaultValue: defaultValue?.titleFa,
              error: !!state.errors?.titleFa,
              helperText: state.errors?.titleFa,
            },
            {
              name: "slug",
              label: "Slug",
              type: "string",
              defaultValue: defaultValue?.slug,
              error: !!state.errors?.slug,
              helperText: state.errors?.slug,
            },
            {
              name: "returnReasonAlert",
              type: "textarea",
              label: "Return Reason",
              defaultValue: defaultValue?.returnReasonAlert,
              error: !!state.errors?.returnReasonAlert,
              helperText: state.errors?.returnReasonAlert,
            },
          ]}
        />
        <SubmitButton variant={"default"} className="mt-4">
          Save
        </SubmitButton>
      </div>
    </form>
  );
}
