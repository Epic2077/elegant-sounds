"use server";
import "server-only";

import { ISeller, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { SellerType } from "@/lib/validation";
import { getAccessToken } from "./city";

// Create a new Seller
export const createSeller = async (
  body: Partial<SellerType>
): Promise<ISeller> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<ISeller>(`${ADMIN_BASE_URL}/sellers`, accessToken, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Update an existing city
export const updateSeller = async (
  id: string,
  body: Partial<SellerType>
): Promise<ISeller> => {
  const accessToken = await getAccessToken();

  try {
    const data = await serverApiFetch<ISeller>(
      `${ADMIN_BASE_URL}/sellers/${id}`,
      accessToken,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    revalidateTag(`sellers-${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

// Get a paginated list of Sellers
export const getAllSellers = async (
  params?: unknown
): Promise<PaginatedResultApi<ISeller>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<ISeller>>(
    `${ADMIN_BASE_URL}/sellers?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a Seller
export const deleteSeller = async (
  id: string
): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/sellers/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a Seller by its ID
export const getSellerById = async (id: string): Promise<ISeller> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<ISeller>(
    `${ADMIN_BASE_URL}/sellers/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleSeller", `sellers-${id}`],
      },
    }
  );
};
