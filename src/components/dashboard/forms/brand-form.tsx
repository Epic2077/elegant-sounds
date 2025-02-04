"use client";
import { Stack } from "@mui/material";
import { useActionState } from "react";
import SubmitButton from "../SubmitButton";
import AIForm from "./AIForm";
import { IBrand } from "@/app/api/dashboard/server-api/types";
import { createOrUpdateBrandAction } from "@/app/actions/brands";

type BrandFormType = {
  brand?: IBrand;
};
export const BrandForm = ({ brand }: BrandFormType) => {
  const [state, action] = useActionState(createOrUpdateBrandAction, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      <Stack spacing={2} mt={2}>
        {brand?.id && <input hidden name="id" defaultValue={brand.id} />}
        <AIForm
          schema={[
            {
              name: "titleEn",
              label: "English Title ",
              type: "string",
              defaultValue: brand?.titleEn,
              error: !!state.errors?.titleEn,
              helperText: state.errors?.titleEn,
            },
            {
              name: "titleFa",
              label: "Farsi Title",
              type: "string",
              defaultValue: brand?.titleFa,
              error: !!state.errors?.titleFa,
              helperText: state.errors?.titleFa,
            },
            {
              name: "slug",
              label: "Slug",
              type: "string",
              defaultValue: brand?.slug,
              error: !!state.errors?.slug,
              helperText: state.errors?.slug,
            },
            {
              name: "logo",
              type: "image",
              defaultValue: brand?.logo,
              error: !!state.errors?.logo,
              helperText: state.errors?.logo,
            },
          ]}
        />
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
};
