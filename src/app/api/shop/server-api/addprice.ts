import { PriceType } from "@/lib/validation";
import { cookies } from "next/headers";
import { serverApiFetch } from "../../base";
import { SHOP_BASE_URL } from "@/app/Base";
import { revalidateTag } from "next/cache";
import { SellerInfo } from "../../dashboard/server-api/types";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export const addPrice = async (
  code: string,
  body: Partial<PriceType>
): Promise<SellerInfo> => {
  const accessToken = await getAccessToken();

  console.log("body", body);
  console.log("code", code);
  const data = await serverApiFetch<SellerInfo>(
    `${SHOP_BASE_URL}/sellers/product/${code}/add-price`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  revalidateTag(`product-${code}`);

  return data;
};
