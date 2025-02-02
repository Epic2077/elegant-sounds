import { useQuery } from "@tanstack/react-query";
import Axios from "./base";
import { IBrand, PaginatedResultApi } from "../server-api/types";

async function getAllBrands(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IBrand>>("/admin/brands", {
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
