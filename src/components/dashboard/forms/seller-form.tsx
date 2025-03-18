"use client";
import { Stack } from "@mui/material";
import { useActionState } from "react";
import SubmitButton from "../SubmitButton";
import AIForm from "./AIForm";
import { createOrUpdateSellerAction } from "@/app/actions/sellers";
import { ISeller } from "@/app/api/dashboard/server-api/types";
import UserField from "../fields/user-field";

type SellerFormProps = {
  defaultValue?: ISeller;
};
export default function SellerForm({ defaultValue }: SellerFormProps) {
  const [state, action] = useActionState(createOrUpdateSellerAction, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      {defaultValue?.id && (
        <input hidden name="id" defaultValue={defaultValue.id} />
      )}
      <Stack spacing={2} mt={2}>
        <UserField
          defaultValue={defaultValue?.user}
          name="user"
          error={!!state?.errors?.user}
          helperText={state?.errors?.user}
        />
        <AIForm
          schema={[
            {
              name: "name",
              type: "string",
              label: "Name",
              defaultValue: defaultValue?.name,
              error: !!state.errors?.name,
              helperText: state.errors?.name,
            },
            {
              name: "slug",
              label: "Slug",
              type: "string",
              defaultValue: defaultValue?.slug,
              error: !!state.errors?.slug,
              helperText: state.errors?.slug,
            },
          ]}
        />
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}
