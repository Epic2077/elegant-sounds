import { useQuery } from "@tanstack/react-query";
import Axios from "./base";
import { IProperty, PaginatedResultApi } from "../server-api/types";

async function getAllProperties(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IProperty>>(
    "/admin/properties",
    {
      params: { ...params, pageSize: 25 },
    }
  );
  return res.data;
}

export function usePropertiesQuery(q: string) {
  return useQuery({
    queryKey: ["properties", q],
    queryFn: () => getAllProperties({ q }),
  });
}
