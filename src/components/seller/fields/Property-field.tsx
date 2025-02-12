"use client";

import { usePropertiesQuery } from "@/app/api/dashboard/client-api/properties";
import { IProperty } from "@/app/api/dashboard/server-api/types";
import React, { useState } from "react";
import MultiAsyncListField from "./multi-async-list-field";

type PropertiesFieldProps = {
  name: string;
  bg?: string;
  defaultValue?: IProperty[];
};

export default function PropertiesField({
  defaultValue,
  name,
  bg,
}: PropertiesFieldProps) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = usePropertiesQuery(query);
  return (
    <MultiAsyncListField
      bg={bg}
      options={data?.results ?? []}
      getOptionLabel={(o) => o.label}
      groupBy={(o) => o.type}
      isLoading={isLoading}
      label="Properties"
      name={name}
      setQuery={setQuery}
      defaultValue={defaultValue}
    />
  );
}
