"use server";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { revalidatePath } from "next/cache";
import { ApiError } from "next/dist/server/api-utils";
import { changeUserStatus } from "../api/dashboard/server-api/users";

export async function changeUserStatusAction(id: string, isActive: boolean) {
  await ensureServerAuthenticated();
  try {
    await changeUserStatus(id, { isActive });
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  revalidatePath("/admin/dashboard/users");
}
