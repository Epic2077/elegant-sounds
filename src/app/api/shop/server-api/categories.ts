"use server";
import { CategoryType } from "@/lib/validation";
import "server only";
import { ICategory } from "../../dashboard/server-api/types";
import { getAccessToken } from "../../dashboard/server-api/city";
import { serverApiFetch } from "../../dashboard/server-api/base";
import { SHOP_BASE_URL } from "../../Base";

// New Category
export const createCategory = async (
  body: Partial<CategoryType>
): Promise<ICategory> => {
  const accessToken = await getAccessToken();
  try {
    return serverApiFetch<ICategory>(
      `${SHOP_BASE_URL}/categories`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  } catch (e) {
    throw e;
  }
};
