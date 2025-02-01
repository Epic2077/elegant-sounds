"use client";
import React, { useState } from "react";
import AsyncListField from "./async-list-filed";
import { ICategory } from "@/app/api/dashboard/server-api/types";
import { useCategoriesQuery } from "@/app/api/dashboard/client-api/categories";

type Props = {
  name: string;
  defaultValue?: ICategory;
  error?: boolean;
  helperText?: string | string[];
};

export default function CategoryField({
  name,
  defaultValue,
  error,
  helperText,
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
    />
  );
}
