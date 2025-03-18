import { useQuery } from "@tanstack/react-query";
import { IColor, PaginatedResultApi } from "../../dashboard/server-api/types";
import Axios from "../../dashboard/client-api/base";

async function getAllColors(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IColor>>("/shop/colors", {
    params: { ...params, pageSize: 25 },
  });
  return res.data;
}

export function useColorsQuery(q: string) {
  return useQuery({
    queryKey: ["colors", q],
    queryFn: () => getAllColors({ q }),
  });
}
