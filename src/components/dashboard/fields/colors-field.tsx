import { useColorsQuery } from "@/app/api/dashboard/client-api/colors";
import { IColor } from "@/app/api/dashboard/server-api/types";
import React, { useState } from "react";
import MultiAsyncListField from "../forms/multi-async-list-field";

type ColorFieldProps = {
  name: string;
  defaultValue?: IColor[];
};

export default function ColorsField({ defaultValue, name }: ColorFieldProps) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useColorsQuery(query);
  return (
    <MultiAsyncListField
      options={data?.results ?? []}
      getOptionLabel={(o) => o.title}
      isLoading={isLoading}
      label="Colors"
      name={name}
      setQuery={setQuery}
      defaultValue={defaultValue}
    />
  );
}
