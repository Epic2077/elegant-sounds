"use server";
import "server-only";

import { ProductType } from "@/lib/validation";
import { IProduct, PaginatedResultApi } from "../../dashboard/server-api/types";
import { SHOP_BASE_URL } from "../../../Base";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { serverApiFetch } from "../../base";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// New Product
export const createProduct = async (
  body: Partial<ProductType>
): Promise<IProduct> => {
  const accessToken = await getAccessToken();
  try {
    return serverApiFetch<IProduct>(`${SHOP_BASE_URL}/products`, accessToken, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw e;
  }
};

// Update Products
export const updateProducts = async (
  id: string,
  body: Partial<ProductType>
): Promise<IProduct> => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<IProduct>(
    `${SHOP_BASE_URL}/products/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`products-${id}`);

  return data;
};

// Get a paginated list of products
export const getProducts = async (
  params?: unknown
): Promise<PaginatedResultApi<IProduct>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IProduct>>(
    `${SHOP_BASE_URL}/products?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete Product
export const deleteProduct = async (id: string) => {
  const accessToken = await getAccessToken();
  return serverApiFetch<void>(`${SHOP_BASE_URL}/products/${id}`, accessToken, {
    method: "DELETE",
  });
};

// Get Product by Id
export const getProduct = async (id: string): Promise<IProduct> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<IProduct>(
    `${SHOP_BASE_URL}/products/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["AllSingleProduct", `products-${id}`],
      },
    }
  );
};
