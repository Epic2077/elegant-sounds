import Axios from "@/app/api/dashboard/client-api/base";
import { useQuery } from "@tanstack/react-query";

async function getAllCities() {
  const res = await Axios.get("/cities");
  return res.data;
}

export function useCityQuery() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => getAllCities(),
  });
}
