// /api/dashboard/server-api/base.ts
import { ApiError } from "next/dist/server/api-utils";

export const serverApiFetch = async <T>(
  url: string,
  accessToken: string | undefined, // Change parameter to accept accessToken directly
  options?: RequestInit
): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options?.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new ApiError(res.status, res.statusText, errorBody);
  }
  return res.json();
};
