"use server";
import "server-only";

import { IProperty, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { PropertyType } from "@/lib/validation";
import { getAccessToken } from "./city";

// Create a new Properties
export const createProperties = async (
  body: Partial<PropertyType>
): Promise<IProperty> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IProperty>(
    `${ADMIN_BASE_URL}/properties`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
};

// Update an existing city
export const updateProperties = async (
  id: string,
  body: Partial<PropertyType>
): Promise<IProperty> => {
  const accessToken = await getAccessToken();
  const data = await serverApiFetch<IProperty>(
    `${ADMIN_BASE_URL}/properties/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`properties-${id}`);
  return data;
};

// Get a paginated list of properties
export const getProperties = async (
  params?: unknown
): Promise<PaginatedResultApi<IProperty>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IProperty>>(
    `${ADMIN_BASE_URL}/properties?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a Properties
export const deleteProperties = async (
  id: string
): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/properties/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a Properties by its ID
export const getPropertiesById = async (id: string): Promise<IProperty> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IProperty>(
    `${ADMIN_BASE_URL}/properties/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleProperties", `properties-${id}`],
      },
    }
  );
};
