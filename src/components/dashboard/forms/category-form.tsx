"use client";
import { Stack } from "@mui/material";
import React, { useActionState } from "react";
import AIForm from "./AIForm";
import SubmitButton from "../SubmitButton";
import { createOrUpdateCategoryAction } from "@/app/actions/categories";
import { ICategory } from "@/app/api/dashboard/server-api/types";
import CategoryField from "../fields/category-feild";
import PropertiesField from "./properties-field";

type CategoryFormProps = {
  defaultValue?: ICategory;
};

export default function CategoryForm({ defaultValue }: CategoryFormProps) {
  const [state, action] = useActionState(createOrUpdateCategoryAction, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      <Stack spacing={2} mt={2}>
        {defaultValue?.id && (
          <input hidden name="id" defaultValue={defaultValue.id} />
        )}
        <CategoryField
          error={!!state?.errors?.parent}
          helperText={state?.errors?.parent}
          name="parent"
          defaultValue={defaultValue?.parent}
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
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}
