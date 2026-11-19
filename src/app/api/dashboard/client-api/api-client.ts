"use client";

import { ApiError } from "next/dist/server/api-utils";

export const clientApiFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options?.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new ApiError(res.status, errorBody?.message ?? res.statusText);
  }
  return res.json();
};
