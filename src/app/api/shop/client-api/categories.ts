import { useQuery } from "@tanstack/react-query";
import Axios from "../../dashboard/client-api/base";
import {
  ICategory,
  PaginatedResultApi,
} from "../../dashboard/server-api/types";

async function getAllCategories(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<ICategory>>(
    "/shop/categories",
    {
      params: { ...params, pageSize: 25 },
    }
  );
  return res.data;
}

export function useCategoriesQuery(q: string) {
  return useQuery({
    queryKey: ["categories", q],
    queryFn: () => getAllCategories({ q }),
  });
}
