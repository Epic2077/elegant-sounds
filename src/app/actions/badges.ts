"use server";
import { formDataToObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { ApiError } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import {
  createBadge,
  deleteBadge,
  updateBadge,
} from "../api/dashboard/server-api/badges";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { BadgeFormSchema, BadgeFormState } from "@/lib/validation";

export async function createOrUpdateBadgeAction(
  _: BadgeFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = BadgeFormSchema.safeParse(formDataToObject(formData));
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateBadge(id.toString(), validatedFields.data);
    } else {
      await createBadge(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: e.body?.errors as BadgeFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/dashboard/badges");
}

export async function deleteBadgeAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteBadge(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/badges");
}
