"use server";

import { FormState } from "@/lib/validation";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { updateProfile } from "../server-api/update";
import { ApiError } from "next/dist/server/api-utils";
import { z } from "zod";

// Define the address schema
const addressSchema = z.object({
  location: z.array(z.number()).length(2),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

// Define the profile schema
const profileSchema = z.object({
  nationCode: z.string(),
  mobile: z.string(),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/), // ISO 8601 format
  addressList: z.array(addressSchema),
});

export type ProfileData = z.infer<typeof profileSchema>;

export async function updateProfileAction(
  state: FormState<ProfileData>,
  data: ProfileData
) {
  await ensureServerAuthenticated();

  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten());
    return {
      message: "Validation failed",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateProfile(validatedFields.data);
    return {
      message: "Profile updated successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error instanceof ApiError) {
      return {
        message: error.message,
        success: false,
        errors: { general: [error.message] },
      };
    }
    return {
      message: "Failed to update profile",
      success: false,
    };
  }
}
