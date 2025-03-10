"use server";

import { formDataToObject } from "@/lib/utils";
import { OrderFormState, OrderSchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { createOrder, getOrders } from "../server-api/order";
import { ApiError } from "next/dist/server/api-utils";
import { IOrder } from "../../dashboard/server-api/types";

export async function createOrderAction(
  state: OrderFormState,
  formData: FormData
): Promise<OrderFormState> {
  // Check authentication without redirecting
  await ensureServerAuthenticated();

  const data = formDataToObject(formData);

  // Parse shippingAddress if it’s a string
  if (typeof data.shippingAddress === "string") {
    try {
      data.shippingAddress = JSON.parse(data.shippingAddress);
    } catch (e) {
      console.error("Error parsing shippingAddress:", e);
      return {
        message: "Invalid shipping address format",
        success: false,
        errors: {},
      };
    }
  }

  // Parse orderItems if it’s a string
  if (typeof data.orderItems === "string") {
    try {
      data.orderItems = JSON.parse(data.orderItems);
    } catch (e) {
      console.error("Error parsing orderItems:", e);
      return {
        message: "Invalid order items format",
        success: false,
        errors: {},
      };
    }
  }

  // Validate the form data against the schema
  const validatedFields = OrderSchemaZod.safeParse(data);
  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createOrder(validatedFields.data);
    return {
      message: "Order created successfully",
      success: true,
      errors: {} as OrderFormState["errors"],
    };
  } catch (e) {
    console.error("Error creating order:", e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        success: false,
        errors: {} as OrderFormState["errors"],
      };
    }
    return {
      message: "Failed to create order",
      success: false,
      errors: {},
    };
  }
}

export async function fetchOrdersAction(): Promise<IOrder[]> {
  const response = await getOrders();
  return response.results; // Access the results array
}
