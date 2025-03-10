"use server";

import { formDataToObject } from "@/lib/utils";
import { PriceFormState, PriceSchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { addPrice } from "../server-api/addprice";
import { ApiError } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";

export async function createPriceAction(
  state: PriceFormState,
  formData: FormData
) {
  await ensureServerAuthenticated();
  const code = formData.get("code");
  const validatedFields = PriceSchemaZod.safeParse(formDataToObject(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (code) {
      await addPrice(code.toString(), validatedFields.data);
    } else {
      console.log("No code found");
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as PriceFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/seller/shop/products");
}
