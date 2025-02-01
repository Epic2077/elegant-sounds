"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { CategoryFormState, CategorySchemaZod } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/dashboard/server-api/categories";
import { ApiError } from "next/dist/server/api-utils";

export async function createOrUpdateCategoryAction(
  state: CategoryFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = CategorySchemaZod.safeParse(
    formDataToObject(formData)
  );
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      await updateCategory(id.toString(), validatedFields.data);
    } else {
      await createCategory(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: {} as CategoryFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/dashboard/categories");
}

export async function deleteCategoryAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteCategory(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/dashboard/categories");
}
