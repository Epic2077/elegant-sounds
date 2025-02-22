// CommentForm.tsx
"use client";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { createOrUpdateCommentAction } from "@/app/api/user/action/comments";

interface Comment {
  id: number;
  text: string;
  rating: number;
}

interface CommentFormProps {
  productId: number;
  comment?: Comment;
  onSuccess: () => void;
}

export default function CommentForm({
  productId,
  comment,
  onSuccess,
}: CommentFormProps) {
  const [state, action, pending] = useActionState(createOrUpdateCommentAction, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <div className="mt-8">
      {state.message && (
        <div className="bg-destructive text-destructive-foreground p-2 mb-4">
          {state.message}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">
        {comment ? "Edit Comment" : "Add a Comment"}
      </h3>
      <form action={action} className="space-y-4">
        <input type="hidden" name="product" value={productId} />
        {comment && <input type="hidden" name="commentId" value={comment.id} />}

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <Textarea
            id="text"
            name="text"
            defaultValue={comment?.text}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <Select name="rating" defaultValue={comment?.rating.toString() || ""}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : comment ? (
              "Update Comment"
            ) : (
              "Add Comment"
            )}
          </Button>
          {comment && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess()}
              disabled={pending}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
