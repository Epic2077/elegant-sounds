"use client";
import { Stack } from "@mui/material";
import { useActionState } from "react";
import SubmitButton from "../SubmitButton";
import AIForm from "./AIForm";
import { IColor } from "@/app/api/dashboard/server-api/types";
import { createOrUpdateColorAction } from "@/app/actions/colors";

type ColorFormProps = {
  defaultValue?: IColor;
};
export default function ColorForm({ defaultValue }: ColorFormProps) {
  const [state, action] = useActionState(createOrUpdateColorAction, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      {defaultValue?.id && (
        <input hidden name="id" defaultValue={defaultValue.id} />
      )}
      <Stack spacing={2} mt={2}>
        <AIForm
          schema={[
            {
              name: "title",
              type: "string",
              label: "Color Name",
              defaultValue: defaultValue?.title,
              error: !!state.errors?.title,
              helperText: state.errors?.title,
            },
            {
              name: "hexCode",
              label: "HexCode",
              type: "color",
              defaultValue: defaultValue?.hexCode,
              error: !!state.errors?.hexCode,
              helperText: state.errors?.hexCode,
            },
          ]}
        />
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}
