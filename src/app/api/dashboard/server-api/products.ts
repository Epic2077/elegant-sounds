"use server";
import "server-only";

import { IProduct, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ProductType } from "@/lib/validation";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { getAccessToken } from "./city";

// Create a new Product
export const createProduct = async (
  body: Partial<ProductType>
): Promise<IProduct> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IProduct>(`${ADMIN_BASE_URL}/products`, accessToken, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Update an existing city
export const updateProduct = async (
  id: string,
  body: Partial<ProductType>
): Promise<IProduct> => {
  const accessToken = await getAccessToken();

  try {
    const data = await serverApiFetch<IProduct>(
      `${ADMIN_BASE_URL}/products/${id}`,
      accessToken,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    revalidateTag(`products-${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

// Get a paginated list of products
export const getProducts = async (
  params?: unknown
): Promise<PaginatedResultApi<IProduct>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IProduct>>(
    `${ADMIN_BASE_URL}/products?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a Product
export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/products/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a Product by its ID
export const getProductById = async (id: string): Promise<IProduct> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IProduct>(
    `${ADMIN_BASE_URL}/products/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleProduct", `products-${id}`],
      },
    }
  );
};
