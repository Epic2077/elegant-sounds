"use server";
import "server-only";

import { IUser, PaginatedResultApi } from "./types";
import { ADMIN_BASE_URL } from "../../../Base";
import { serverApiFetch } from "../../base";
import { getAccessToken } from "./city";

// Get a paginated list of users
export const getAllUsers = async (
  params?: unknown
): Promise<PaginatedResultApi<IUser>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IUser>>(
    `${ADMIN_BASE_URL}/auth/users?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};

// Get a users by its ID
export const getUsersById = async (id: string): Promise<IUser> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<IUser>(
    `${ADMIN_BASE_URL}/auth/users/${id}`,
    accessToken,
    {
      cache: "force-cache",
      next: {
        tags: ["allSingleusers", `users-${id}`],
      },
    }
  );
};

// change user status
export const changeUserStatus = async (
  id: string,
  data: { isActive: boolean }
): Promise<IUser> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<IUser>(
    `${ADMIN_BASE_URL}/auth/users/${id}/change-status`,
    accessToken,
    {
      method: "post",
      cache: "force-cache",
      body: JSON.stringify(data),
    }
  );
};
