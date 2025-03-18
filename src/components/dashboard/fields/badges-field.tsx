import { useBadgesQuery } from "@/app/api/dashboard/client-api/badges";
import { IBadge } from "@/app/api/dashboard/server-api/types";
import React, { useState } from "react";
import MultiAsyncListField from "../forms/multi-async-list-field";

type BadgeFieldProps = {
  name: string;
  defaultValue?: IBadge[];
};

export default function BadgeField({ defaultValue, name }: BadgeFieldProps) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useBadgesQuery(query);
  return (
    <MultiAsyncListField
      options={data?.results ?? []}
      getOptionLabel={(o) => o.title}
      isLoading={isLoading}
      label="Badges"
      name={name}
      setQuery={setQuery}
      defaultValue={defaultValue}
    />
  );
}
