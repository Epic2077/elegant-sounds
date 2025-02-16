"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/dashboard/server-api/products";
import { ProductFormState, ProductSchemaZod } from "@/lib/validation";
import { ApiError } from "next/dist/server/api-utils";

export async function createOrUpdateProductAction(
  state: ProductFormState,
  formData: FormData
) {
  /// validate input
  await ensureServerAuthenticated();
  const id = formData.get("id");
  const validatedFields = ProductSchemaZod.safeParse(
    formDataToObject(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    if (id) {
      console.log(validatedFields.data);
      await updateProduct(id.toString(), validatedFields.data);
    } else {
      console.log(validatedFields.data);
      await createProduct(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as ProductFormState["errors"],
      };
    } else {
      return {
        message: "failed with call api",
        success: false,
      };
    }
  }
  redirect("/admin/dashboard/products");
}

export async function deleteProductAction(id: string) {
  await ensureServerAuthenticated();
  try {
    await deleteProduct(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/products");
}
