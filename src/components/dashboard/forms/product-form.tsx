"use client";

import { Stack } from "@mui/material";
import React, { useActionState } from "react";
import AIForm from "./AIForm";
import SubmitButton from "../SubmitButton";
import SingleUpload from "../upload/single-upload";
import CategoryField from "../fields/category-feild";
import BrandField from "../fields/brand-field";
import BadgeField from "../fields/badges-field";
import ColorsField from "../fields/colors-field";
import { createOrUpdateProductAction } from "@/app/actions/products";
import { IProduct } from "@/app/api/dashboard/server-api/types";

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
      <Stack spacing={2} mt={2}>
        <Stack gap={2} direction="row">
          <SingleUpload
            name="images.main"
            defaultValue={defaultValue?.images.main}
          />
          <SingleUpload
            multi
            name="images.list"
            defaultValue={defaultValue?.images.list}
          />
        </Stack>

        <Stack direction="row" gap={2}>
          <CategoryField
            name="category"
            defaultValue={defaultValue?.category}
          />
          <BrandField name="brand" defaultValue={defaultValue?.brand} />
        </Stack>
        <Stack direction="row" gap={2}>
          <BadgeField name="badges" defaultValue={defaultValue?.badges} />
          <ColorsField name="colors" defaultValue={defaultValue?.colors} />
        </Stack>
        <AIForm
          schema={[
            {
              name: "code",
              type: "number",
              label: "Product Code",
              defaultValue: defaultValue?.code,
              error: !!state.errors?.code,
              helperText: state.errors?.code,
            },
            {
              name: "titleEn",
              label: "English Name",
              size: 6,
              type: "string",
              defaultValue: defaultValue?.titleEn,
              error: !!state.errors?.titleEn,
              helperText: state.errors?.titleEn,
            },
            {
              name: "titleFa",
              label: "Farsi Name",
              size: 6,
              type: "string",
              defaultValue: defaultValue?.titleFa,
              error: !!state.errors?.titleFa,
              helperText: state.errors?.titleFa,
            },
            {
              name: "expert_reviews",
              label: "Description",
              type: "textarea",
              defaultValue: defaultValue?.expert_reviews,
              error: !!state.errors?.expert_reviews,
              helperText: state.errors?.expert_reviews,
            },
          ]}
        />
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}

export default ProductForm;
