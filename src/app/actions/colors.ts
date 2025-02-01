"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { ColorFormState, ColorSchemaZod } from "@/lib/validation";
import { ApiError } from "next/dist/server/api-utils";
import {
  createColor,
  deleteColor,
  updateColor,
} from "../api/dashboard/server-api/colors";

export async function createOrUpdateColorAction(
  state: ColorFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = ColorSchemaZod.safeParse(formDataToObject(formData));
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateColor(id.toString(), validatedFields.data);
    } else {
      await createColor(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as ColorFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/admin/dashboard/colors");
}

export async function deleteColorAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteColor(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/colors");
}
