import axios from "axios";
import { IProduct, PaginatedResultApi } from "../dashboard/server-api/types";
import { BASE_URL } from "@/app/Base";

export const getProducts = async (
  params?: unknown
): Promise<PaginatedResultApi<IProduct>> => {
  const searchParams = new URLSearchParams(params as Record<string, string>);
  const response = await axios.get(
    `${BASE_URL}/products?${searchParams.toString()}`
  );
  return response.data;
};

interface GetProductByIdParams {
  id: string;
}

export const getProductById = async ({
  id,
}: GetProductByIdParams): Promise<IProduct> => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
