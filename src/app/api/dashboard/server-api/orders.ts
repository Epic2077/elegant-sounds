import { IOrder, PaginatedResultApi } from "./types";
import { ADMIN_BASE_URL } from "../../Base";
import { serverApiFetch } from "./base";
import { getAccessToken } from "./city";

// Get a paginated list of colors
export const getOrders = async (
  params?: unknown
): Promise<PaginatedResultApi<IOrder>> => {
  const accessToken = await getAccessToken();
  const search = new URLSearchParams(params as Record<string, string>);
  return serverApiFetch<PaginatedResultApi<IOrder>>(
    `${ADMIN_BASE_URL}/orders?${search.toString()}`,
    accessToken,
    {
      cache: "no-store",
    }
  );
};
