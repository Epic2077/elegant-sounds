// /api/dashboard/server-api/city.ts
"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_BASE_URL } from "../../Base";
import { CityType } from "@/lib/validation";
import { ICity, PaginatedResultApi } from "./types";
import { serverApiFetch } from "./base";

// Helper to get access token
export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// Create a new city
export const createCity = async (body: Partial<CityType>): Promise<ICity> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<ICity>(`${ADMIN_BASE_URL}/cities`, accessToken, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Update an existing city
export const updateCity = async (
  id: string,
  body: Partial<CityType>
): Promise<ICity> => {
  const accessToken = await getAccessToken();
  const data = await serverApiFetch<ICity>(
    `${ADMIN_BASE_URL}/cities/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`cities-${id}`);
  return data;
};

// Get a paginated list of cities
export const getCities = async (
  params?: any
): Promise<PaginatedResultApi<ICity>> => {
  const accessToken = await getAccessToken();
  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<ICity>>(
    `${ADMIN_BASE_URL}/cities?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a city
export const deleteCity = async (id: string): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/cities/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a city by its ID
export const getCityById = async (id: string): Promise<ICity> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<ICity>(`${ADMIN_BASE_URL}/cities/${id}`, accessToken, {
    next: {
      tags: ["allSingleCity", `cities-${id}`],
    },
  });
};
