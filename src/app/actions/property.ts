"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { PropertyFormState, PropertySchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { ApiError } from "next/dist/server/api-utils";
import {
  createProperties,
  deleteProperties,
  updateProperties,
} from "../api/dashboard/server-api/property";

export async function createOrUpdatePropertyAction(
  state: PropertyFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = PropertySchemaZod.safeParse(
    formDataToObject(formData)
  );
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateProperties(id.toString(), validatedFields.data);
    } else {
      await createProperties(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as PropertyFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/admin/dashboard/properties");
}

export async function deletePropertyAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteProperties(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/properties");
}
