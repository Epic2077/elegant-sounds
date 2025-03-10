import { useQuery } from "@tanstack/react-query";
import Axios from "../../dashboard/client-api/base";
import { IBrand, PaginatedResultApi } from "../../dashboard/server-api/types";

async function getAllBrands(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IBrand>>("/shop/brands", {
    params: { ...params, pageSize: 25 },
  });
  return res.data;
}

export function useBrandsQuery(q: string) {
  return useQuery({
    queryKey: ["brands", q],
    queryFn: () => getAllBrands({ q }),
  });
}
