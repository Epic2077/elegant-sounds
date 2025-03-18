"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { SellerFormState, SellerSchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import {
  createSeller,
  deleteSeller,
  updateSeller,
} from "../api/dashboard/server-api/sellers";
import { ApiError } from "next/dist/server/api-utils";

export async function createOrUpdateSellerAction(
  state: SellerFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = SellerSchemaZod.safeParse(formDataToObject(formData));
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateSeller(id.toString(), validatedFields.data);
    } else {
      await createSeller(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { message: e.message } as SellerFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/admin/dashboard/sellers");
}

export async function deleteSellerAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteSeller(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/sellers");
}
