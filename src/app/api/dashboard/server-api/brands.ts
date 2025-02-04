"use server";
import "server-only";

import { IBrand, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { getAccessToken } from "./city";

export const createBrand = async (body: Partial<IBrand>): Promise<IBrand> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IBrand>(`${ADMIN_BASE_URL}/brands`, accessToken, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Update an existing brand
export const updateBrand = async (
  id: string,
  body: Partial<IBrand>
): Promise<IBrand> => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<IBrand>(
    `${ADMIN_BASE_URL}/brands/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`brands-${id}`);
  return data;
};

// Get a paginated list of brands
export const getBrands = async (
  params?: unknown
): Promise<PaginatedResultApi<IBrand>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IBrand>>(
    `${ADMIN_BASE_URL}/brands?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a brand
export const deleteBrand = async (id: string): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/brands/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a brand by its ID
export const getBrandById = async (id: string): Promise<IBrand> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IBrand>(`${ADMIN_BASE_URL}/brands/${id}`, accessToken, {
    cache: "force-cache",
    next: {
      tags: ["allSingleBrand", `brands-${id}`],
    },
  });
};
