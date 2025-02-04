"use client";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useActionState, useState } from "react";
import SubmitButton from "../SubmitButton";
import { Remove } from "@mui/icons-material";
import AIForm from "./AIForm";
import {
  IProperty,
  IPropertyOption,
} from "@/app/api/dashboard/server-api/types";
import { createOrUpdatePropertyAction } from "@/app/actions/property";
type Props = {
  defaultValue?: IProperty;
};

export default function PropertyForm({ defaultValue }: Props) {
  const [state, action] = useActionState(createOrUpdatePropertyAction, {
    message: "",
    success: false,
  });
  const [options, setOptions] = useState<IPropertyOption[]>(
    defaultValue?.options ?? []
  );
  const addOption = () => {
    const t = new Date().toISOString();
    setOptions((old) => [...old, { id: t, value: "", label: "" }]);
  };
  const removeOption = (value: string) => {
    setOptions((old) => old.filter((item) => item.id !== value));
  };
  return (
    <form action={action}>
      {defaultValue?.id && (
        <input type="hidden" name="id" defaultValue={defaultValue?.id} />
      )}
      <Stack spacing={2} mt={2}>
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
              name: "label",
              type: "string",
              label: "Display Title",
              defaultValue: defaultValue?.label,
              error: !!state.errors?.label,
              helperText: state.errors?.label,
            },
            {
              name: "type",
              type: "string",
              label: "Type",
              defaultValue: defaultValue?.type,
              error: !!state.errors?.type,
              helperText: state.errors?.type,
            },
          ]}
        />
        {options.map((item, index) => (
          <Stack direction={"row"} spacing={2} key={item.id}>
            <TextField
              fullWidth
              name={`options.${index}.label`}
              label="Label"
              defaultValue={defaultValue?.options?.[index]?.label}
            />
            <TextField
              fullWidth
              name={`options.${index}.value`}
              label="Value"
              defaultValue={defaultValue?.options?.[index]?.value}
            />
            <IconButton onClick={() => removeOption(item.id)}>
              <Remove />
            </IconButton>
          </Stack>
        ))}

        <Button onClick={addOption}>Add New Option</Button>
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}
