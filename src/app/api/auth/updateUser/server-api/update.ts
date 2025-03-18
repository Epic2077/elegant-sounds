"use server";

import { serverApiFetch } from "@/app/api/base";
import { BASE_URL } from "@/app/Base";
import { UpdateProfileType } from "@/lib/validation";
import { Profile } from "@/types/Profile";
import { cookies } from "next/headers";

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export const updateProfile = async (
  body: Partial<UpdateProfileType>
): Promise<Profile> => {
  const accessToken = await getAccessToken();

  console.log("Body:", body);

  const data = await serverApiFetch<Profile>(
    `${BASE_URL}/auth/profile`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );

  return data;
};
