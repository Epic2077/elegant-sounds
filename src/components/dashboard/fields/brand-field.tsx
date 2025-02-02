"use client";
import React from "react";
import AsyncListField from "./async-list-filed";
import { useBrandsQuery } from "@/app/api/dashboard/client-api/brand";
import { IBrand } from "@/app/api/dashboard/server-api/types";

type Props = {
  name: string;
  defaultValue?: IBrand;
};

export default function BrandField({ name, defaultValue }: Props) {
  const { data, isLoading } = useBrandsQuery("");
  return (
    <AsyncListField
      options={data?.results ?? []}
      getOptionLabel={(o) => o.titleEn}
      isLoading={isLoading}
      label="Brand"
      name={name}
      setQuery={() => {}}
      defaultValue={defaultValue}
    />
  );
}
