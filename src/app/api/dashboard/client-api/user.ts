import { useQuery } from "@tanstack/react-query";
import Axios from "./base";
import { IUser, PaginatedResultApi } from "../server-api/types";

async function getAllUsers(params: { q?: string }) {
  const res = await Axios.get<PaginatedResultApi<IUser>>("/admin/auth/users", {
    params: { ...params, pageSize: 25 },
  });
  return res.data;
}

export function useUserQuery(q: string) {
  return useQuery({
    queryKey: ["users", q],
    queryFn: () => getAllUsers({ q }),
  });
}
