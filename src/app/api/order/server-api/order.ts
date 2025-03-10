"use server";
import { OrderType } from "@/lib/validation";
import "server-only";
import { IOrder, OrdersResponse } from "../../dashboard/server-api/types";
import { getAccessToken } from "../../dashboard/server-api/city";
import { serverApiFetch } from "../../base";
import { BASE_URL } from "@/app/Base";

export const createOrder = async (body: OrderType): Promise<IOrder> => {
  const accessToken = await getAccessToken();
  try {
    return await serverApiFetch<IOrder>(`${BASE_URL}/orders`, accessToken, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw e; // Let the caller handle the error
  }
};

export async function getOrders(): Promise<OrdersResponse> {
  // Update return type
  const accessToken = await getAccessToken();
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}
