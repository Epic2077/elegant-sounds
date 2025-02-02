import { useQuery } from "@tanstack/react-query";
import Axios from "./base";
import { IColor, PaginatedResultApi } from "../server-api/types";

async function getAllColors(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IColor>>("/admin/colors", {
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
