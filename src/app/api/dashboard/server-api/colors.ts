"use server";
import "server-only";

import { IColor, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../../Base";
import { serverApiFetch } from "../../base";
import { getAccessToken } from "./city";

// Create a new Color
export const createColor = async (body: Partial<IColor>): Promise<IColor> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<IColor>(`${ADMIN_BASE_URL}/colors`, accessToken, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Update an existing city
export const updateColor = async (
  id: string,
  body: Partial<IColor>
): Promise<IColor> => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<IColor>(
    `${ADMIN_BASE_URL}/colors/${id}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`colors-${id}`);
  return data;
};

// Get a paginated list of colors
export const getColors = async (
  params?: unknown
): Promise<PaginatedResultApi<IColor>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IColor>>(
    `${ADMIN_BASE_URL}/colors?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Delete a Color
export const deleteColor = async (id: string): Promise<{ message: string }> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<{ message: string }>(
    `${ADMIN_BASE_URL}/colors/${id}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};

// Get a Color by its ID
export const getColorById = async (id: string): Promise<IColor> => {
  const accessToken = await getAccessToken();

  return serverApiFetch<IColor>(`${ADMIN_BASE_URL}/colors/${id}`, accessToken, {
    cache: "force-cache",
    next: {
      tags: ["allSingleColor", `colors-${id}`],
    },
  });
};
