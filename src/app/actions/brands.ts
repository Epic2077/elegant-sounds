"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { ApiError } from "next/dist/server/api-utils";
import { BrandFormState, BrandSchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import {
  createBrand,
  deleteBrand,
  updateBrand,
} from "../api/dashboard/server-api/brands";

export async function createOrUpdateBrandAction(
  state: BrandFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = BrandSchemaZod.safeParse(formDataToObject(formData));
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateBrand(id.toString(), validatedFields.data);
    } else {
      await createBrand(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as BrandFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/admin/dashboard/brands");
}

export async function deleteBrandAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteBrand(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/brands");
}
