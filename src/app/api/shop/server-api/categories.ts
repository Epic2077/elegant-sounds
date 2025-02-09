"use server";
import "server-only";

import { CategoryType } from "@/lib/validation";
import {
  ICategory,
  PaginatedResultApi,
} from "../../dashboard/server-api/types";
import { SHOP_BASE_URL } from "../../../Base";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { serverApiFetch } from "../../base";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// New Category
export const createCategory = async (
  body: Partial<CategoryType>
): Promise<ICategory> => {
  const accessToken = await getAccessToken();
  try {
    return serverApiFetch<ICategory>(
      `${SHOP_BASE_URL}/categories`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  } catch (e) {
    throw e;
  }
};

// Update Category
export const updateCategory = async (
  id: string,
  body: Partial<CategoryType>
): Promise<ICategory> => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<ICategory>(
    `${SHOP_BASE_URL}/categories/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`categories-${id}`);

  return data;
};

// Get a paginated list of categories
export const getCategories = async (
  params?: unknown
): Promise<PaginatedResultApi<ICategory>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<ICategory>>(
    `${SHOP_BASE_URL}/categories?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete Category
export const deleteCategory = async (id: string) => {
  const accessToken = await getAccessToken();
  return serverApiFetch<void>(
    `${SHOP_BASE_URL}/categories/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get category by Id
export const getCategory = async (id: string): Promise<ICategory> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<ICategory>(
    `${SHOP_BASE_URL}/categories/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["AllSingleCategory", `categories-${id}`],
      },
    }
  );
};
