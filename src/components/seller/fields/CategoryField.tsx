"use client";

import { ICategory } from "@/app/api/dashboard/server-api/types";
import { useState } from "react";
import AsyncListField from "./async-list-filed";
import { useCategoriesQuery } from "@/app/api/shop/client-api/categories";

type Props = {
  name: string;
  defaultValue?: ICategory;
  error?: boolean;
  helperText?: string | string[];
  onChange?: (category: ICategory | null) => void;
};

export default function CategoryField({
  name,
  defaultValue,
  error,
  helperText,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useCategoriesQuery(query);
  return (
    <AsyncListField
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      getOptionLabel={(o) => o.titleEn}
      groupBy={(o) => o.parent?.titleEn ?? "root"}
      isLoading={isLoading}
      label="Category"
      name={name}
      setQuery={setQuery}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
