"use server";
import { revalidatePath } from "next/cache";
import { formDataToObject } from "@/lib/utils";
import { ensureServerAuthenticated } from "@/utils/server-auth";
import { ApiError } from "next/dist/server/api-utils";

// Assuming you have these schemas and imports
import { CommentSchemaZod, CommentFormState } from "@/lib/validation";
import { addComment, deleteComment, updateComment } from "../comments";

export async function createOrUpdateCommentAction(
  state: CommentFormState,
  formData: FormData
) {
  await ensureServerAuthenticated();

  const productId = formData.get("productId");
  console.log(productId);
  const commentId = formData.get("commentId");

  const parsedData = formDataToObject(formData);
  console.log("createOrUpdateCommentAction => parsedData:", parsedData);

  // Validate input
  const validatedFields = CommentSchemaZod.safeParse(
    formDataToObject(formData)
  );

  console.log(
    "createOrUpdateCommentAction => validatedFields:",
    validatedFields
  );

  if (!validatedFields.success) {
    console.log("Validation Failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("commentId:", commentId);
    if (commentId) {
      const resultUpdate = await updateComment(
        commentId.toString(),
        validatedFields.data.text,
        validatedFields.data.rating ?? 0
      );
      console.log("updateComment => result:", resultUpdate);
    } else {
      const resultAdd = await addComment(
        validatedFields.data.product,
        validatedFields.data.text,
        validatedFields.data.rating ?? 0
      );
      console.log("addComment => result:", resultAdd);
    }
  } catch (e) {
    console.error("createOrUpdateCommentAction => error:", e);
    if (e instanceof ApiError) {
      return {
        message: e.message,
        errors: { general: [e.message] } as CommentFormState["errors"],
      };
    }
    return {
      message: "Failed to submit comment",
      success: false,
    };
  }

  revalidatePath(`/product/${productId}`);
  return { success: true };
}

export async function deleteCommentAction(
  commentId: string,
  productId: string
) {
  await ensureServerAuthenticated();

  try {
    await deleteComment(commentId);
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        success: false,
        message: e.message,
      };
    }
    return {
      success: false,
      message: "Failed to delete comment",
    };
  }

  revalidatePath(`/product/${productId}`);
  return { success: true };
}
