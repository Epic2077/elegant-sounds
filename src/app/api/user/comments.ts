"use server";
import { BASE_URL } from "@/app/Base";
import { cookies } from "next/headers";
import "server-only";
import { serverApiFetch } from "../base";
import { IUser } from "../dashboard/server-api/types";

// Define comment interfaces
interface Comment {
  id: string;
  product: string;
  user: IUser;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface CommentsResponse {
  results: Comment[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

// Get comments
export const getComments = async (
  productId: number
): Promise<CommentsResponse> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<CommentsResponse>(
    `${BASE_URL}/product/${productId}/comments`,
    accessToken
  );
};

// Add comment
export const addComment = async (
  productId: number,
  text: string,
  rating: number
): Promise<Comment> => {
  const accessToken = await getAccessToken();
  console.log("addComment => Sending body:", {
    product: productId,
    text,
    rating,
  });
  const response = await serverApiFetch<Comment>(
    `${BASE_URL}/comments`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify({ text, rating, product: productId }),
    }
  );
  console.log("addComment => response:", response);

  return response;
};

// Update comment
export const updateComment = async (
  commentId: string,
  text: string,
  rating: number
): Promise<Comment> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<Comment>(
    `${BASE_URL}/comments/${commentId}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify({ text, rating }),
    }
  );
};

// Delete comment
export const deleteComment = async (commentId: string): Promise<void> => {
  const accessToken = await getAccessToken();
  return serverApiFetch<void>(
    `${BASE_URL}/comments/${commentId}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
};
