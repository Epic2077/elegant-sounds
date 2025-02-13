"use server";
import "server-only";

import { IOrder, PaginatedResultApi } from "../../dashboard/server-api/types";
import { SHOP_BASE_URL } from "../../../Base";
import { cookies } from "next/headers";
import { serverApiFetch } from "../../base";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// Get a paginated list of orders
export const getOrders = async (
  params?: unknown
): Promise<PaginatedResultApi<IOrder>> => {
  const accessToken = await getAccessToken();

  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IOrder>>(
    `${SHOP_BASE_URL}/orders?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};
