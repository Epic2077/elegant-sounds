// /api/dashboard/server-api/base.ts
import { ApiError } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";

export const serverApiFetch = async <T>(
  url: string,
  accessToken: string | undefined,
  options?: RequestInit
): Promise<T> => {
  try {
    if (!accessToken) {
      redirect("/auth/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      redirect("/auth/login");
    }

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new ApiError(res.status, res.statusText, errorBody);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    redirect("/auth/login");
  }
};
