"use client";

import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useActionState, useState } from "react";
import AIForm from "./AIForm";
import BrandField from "../fields/brand-field";
import ColorsField from "../fields/colors-field";
import { createOrUpdateProductAction } from "@/app/actions/products";
import SingleUpload from "../upload/single-upload";
import CategoryField from "../fields/category-feild";
import BadgeField from "../fields/badges-field";
import SubmitButton from "../SubmitButton";
import { ICategory, IProduct } from "@/app/api/dashboard/server-api/types";

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
        <input hidden defaultValue={defaultValue.id} name="id" />
      )}
      {state.message && <Alert severity="warning">{state.message}</Alert>}
      <Stack mt={2} spacing={2}>
        <Stack direction="row" gap={2}>
          <SingleUpload
            defaultValue={defaultValue?.images.main}
            name="images.main"
          />
          <SingleUpload
            multi
            defaultValue={defaultValue?.images.list}
            name="images.list"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <CategoryField
            defaultValue={defaultValue?.category}
            name="category"
            onChange={setCategory}
          />
          <BrandField defaultValue={defaultValue?.brand} name="brand" />
        </Stack>
        <Stack direction="row" gap={2}>
          <BadgeField defaultValue={defaultValue?.badges} name="badges" />
          <ColorsField defaultValue={defaultValue?.colors} name="colors" />
        </Stack>
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
        <Divider />
        <Typography>Properties</Typography>
        {category?.properties.map((item, i) => (
          <Stack key={item.id} gap={1}>
            <input
              hidden
              defaultValue={item.name}
              name={`specifications.${i}.name`}
            />
            <input
              hidden
              defaultValue={item.label}
              name={`specifications.${i}.title`}
            />
            <Box>
              {item.options?.length ? (
                <TextField
                  fullWidth
                  select
                  label={item.label}
                  name={`specifications.${i}.value`}
                  defaultValue={
                    defaultValue?.specifications.find(
                      (i) => i.name === item.name
                    )?.value ?? ""
                  }
                >
                  <MenuItem value="">Please Choose An Options</MenuItem>
                  {item.options.map((o) => (
                    <MenuItem key={o.id} value={o.value}>
                      {o.value}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label={item.label}
                  name={`specifications.${i}.value`}
                  defaultValue={
                    defaultValue?.specifications.find(
                      (i) => i.name === item.name
                    )?.value
                  }
                />
              )}

              <FormControlLabel
                control={<Checkbox name={`specifications.${i}.isDefault`} />}
                label="Show This on top page?"
              />
            </Box>
          </Stack>
        ))}
        <SubmitButton variant="contained">Save</SubmitButton>
      </Stack>
    </form>
  );
}

export default ProductForm;
