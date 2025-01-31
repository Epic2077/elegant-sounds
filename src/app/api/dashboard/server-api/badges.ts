"use server";
import "server-only";

import { IBadge, PaginatedResultApi } from "./types";
import { revalidateTag } from "next/cache";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { getAccessToken } from "./city";

export const createBadge = async (body: Partial<IBadge>) => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch(`${ADMIN_BASE_URL}/badges`, accessToken, {
    method: "post",
    body: JSON.stringify(body),
  });
  return data;
};

export const updateBadge = async (id: string, body: unknown) => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch(
    `${ADMIN_BASE_URL}/badges/${id}`,
    accessToken,
    {
      method: "put",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`badges-${id.toString()}`);
  return data;
};

export const getBadges = async (params?: unknown) => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as string);
  const data = await serverApiFetch<PaginatedResultApi<IBadge>>(
    `${ADMIN_BASE_URL}/badges?${search.toString()}`,
    accessToken
  );
  return data;
};

export const deleteBadge = async (id: string): Promise<unknown> => {
  const accessToken = await getAccessToken();

  const res = await serverApiFetch(
    `${ADMIN_BASE_URL}/badges/${id}`,
    accessToken,
    {
      method: "delete",
    }
  );
  return res;
};

export const getBadgeById = async (id: string) => {
  const accessToken = await getAccessToken();

  const data = await serverApiFetch<IBadge>(
    `${ADMIN_BASE_URL}/badges/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleBadge", `badges-${id}`],
      },
    }
  );
  return data;
};
