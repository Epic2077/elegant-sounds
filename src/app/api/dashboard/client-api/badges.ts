import { useQuery } from "@tanstack/react-query";
import Axios from "./base";
import { IBadge, PaginatedResultApi } from "../server-api/types";

async function getAllBadges(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IBadge>>("/admin/badges", {
    params: { ...params, pageSize: 25 },
  });
  return res.data;
}

export function useBadgesQuery(q: string) {
  return useQuery({
    queryKey: ["badges", q],
    queryFn: () => getAllBadges({ q }),
  });
}
