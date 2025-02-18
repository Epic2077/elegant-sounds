"use client";

import { useBrandsQuery } from "@/app/api/dashboard/client-api/brand";
import { IBrand } from "@/app/api/dashboard/server-api/types";
import AsyncListField from "./async-list-filed";

type props = {
  name: string;
  defaultValue?: IBrand;
};

export default function BrandField({ name, defaultValue }: props) {
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
