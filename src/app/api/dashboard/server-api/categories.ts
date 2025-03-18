"use server";
import "server-only";

import { ICategory, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../../Base";
import { CategoryType } from "@/lib/validation";
import { serverApiFetch } from "../../base";
import { getAccessToken } from "./city";

// Create a new category
export const createCategory = async (
  body: Partial<CategoryType>
): Promise<ICategory> => {
  const accessToken = await getAccessToken();
  try {
    return serverApiFetch<ICategory>(
      `${ADMIN_BASE_URL}/categories`,
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

// Update an existing category
export const updateCategory = async (
  id: string,
  body: Partial<CategoryType>
): Promise<ICategory> => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<ICategory>(
    `${ADMIN_BASE_URL}/categories/${id}`,
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
    `${ADMIN_BASE_URL}/categories?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a category
export const deleteCategory = async (
  id: string
): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/categories/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a category by its ID
export const getCategoryById = async (id: string): Promise<ICategory> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<ICategory>(
    `${ADMIN_BASE_URL}/categories/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleCategory", `categories-${id}`],
      },
    }
  );
};
