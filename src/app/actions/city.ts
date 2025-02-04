// app/actions/city.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToObject } from "@/lib/utils";
import { CityFormState, CitySchemaZod } from "@/lib/validation";
import { ApiError } from "next/dist/server/api-utils";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import {
  createCity,
  deleteCity,
  updateCity,
} from "../api/dashboard/server-api/city";

export async function createOrUpdateCityAction(
  state: CityFormState,
  formData: FormData
) {
  // Server-side authentication check
  ensureServerAuthenticated();

  const id = formData.get("id");
  const validatedFields = CitySchemaZod.safeParse(formDataToObject(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    if (id) {
      await updateCity(id.toString(), validatedFields.data);
    } else {
      await createCity(validatedFields.data);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: e.body?.errors,
      };
    }
    return {
      message: "Failed to communicate with API",
      success: false,
    };
  }
  redirect("/admin/dashboard/cities");
}

export async function deleteCityAction(id: string) {
  ensureServerAuthenticated();

  try {
    await deleteCity(id);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/cities");
}
