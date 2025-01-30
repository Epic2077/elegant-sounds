// utils/server-auth.ts

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ensureServerAuthenticated = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/auth/login");
  }
};

export const getServerAuth = async () => {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value,
    isLoggedIn: !!cookieStore.get("accessToken")?.value,
  };
};
