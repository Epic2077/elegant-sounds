"use client";

import { Stack } from "@mui/material";
import { useActionState } from "react";
import SubmitButton from "../SubmitButton";
import { createOrUpdateCityAction } from "@/app/actions/city";
import { ICity } from "@/app/api/dashboard/server-api/types";
import AIForm from "./AIForm";

type CityFormProps = {
  defaultValue?: ICity;
};
export default function CityForm({ defaultValue }: CityFormProps) {
  const [state, action] = useActionState(createOrUpdateCityAction, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      {defaultValue?.id && <input name="id" defaultValue={defaultValue.id} />}
      <Stack spacing={2} mt={2}>
        <AIForm
          schema={[
            {
              name: "code",
              type: "string",
              label: "City Code",
              defaultValue: defaultValue?.code,
              error: !!state.errors?.code,
              helperText: state.errors?.code,
            },
            {
              name: "slug",
              label: "Bookmark",
              type: "string",
              defaultValue: defaultValue?.slug,
              error: !!state.errors?.slug,
              helperText: state.errors?.slug,
            },
            {
              name: "name",
              type: "string",
              label: "City Name",
              defaultValue: defaultValue?.name,
              error: !!state.errors?.name,
              helperText: state.errors?.name,
            },
          ]}
        />
        <SubmitButton variant="contained">Add City</SubmitButton>
      </Stack>
    </form>
  );
}
