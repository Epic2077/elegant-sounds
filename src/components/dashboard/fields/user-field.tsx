"use client";
import React, { useState } from "react";
import AsyncListField from "./async-list-filed";
import { IUser } from "@/app/api/dashboard/server-api/types";
import { useUserQuery } from "@/app/api/dashboard/client-api/user";

type Props = {
  name: string;
  defaultValue?: IUser;
  error?: boolean;
  helperText?: string | string[];
};

export default function UserField({
  name,
  defaultValue,
  error,
  helperText,
}: Props) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useUserQuery(query);
  return (
    <AsyncListField
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      getOptionLabel={(o) => o.email}
      isLoading={isLoading}
      label="User"
      name={name}
      setQuery={setQuery}
      defaultValue={defaultValue}
    />
  );
}
