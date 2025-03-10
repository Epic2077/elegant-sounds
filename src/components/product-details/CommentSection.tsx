/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Loader2, Trash } from "lucide-react";
import { useUserInfo } from "@/utils/userContext";
import { IProduct, IUser } from "@/app/api/dashboard/server-api/types";
import { getComments } from "@/app/api/user/comments";
import CommentForm from "./CommentForm";
import { deleteCommentAction } from "@/app/api/user/action/comments";

// Define interfaces
interface Comment {
  product: string;
  user: IUser;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface CommentsResponse {
  results: Comment[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export default function CommentSection({ products }: { products: IProduct }) {
  // State management
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | undefined>(
    undefined
  ); // Fixed type

  const { user } = useUserInfo();

  // Current user ID from context and product ID from props
  const currentUserId = user?.id;
  const productId = products.code;

  // Fetch comments when the component mounts or productId changes
  useEffect(() => {
    fetchComments();
  }, [productId]);

  // API Functions
  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getComments(productId);
      setComments((data as CommentsResponse).results);
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
  };

  const handleCommentSuccess = () => {
    setEditingComment(undefined);
    fetchComments();
  };

  const handleDelete = async (commentId: string) => {
    setDeletingId(commentId);
    try {
      await deleteCommentAction(commentId, productId.toString());
      await fetchComments();
    } catch (err: any) {
      setError(err.message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  // Main Render
  return (
    <div className="max-w-2xl mx-auto mt-8">
      {error && (
        <div className="mb-4 p-2 bg-destructive text-destructive-foreground">
          {error}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Comment List */}
      {loading ? (
        <p className="text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
        </p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {comment.user.firstName} {comment.user.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{comment.text}</p>
                <p className="text-sm text-gray-500">
                  Rating: {comment.rating}
                </p>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              {comment.user.id === currentUserId?.toString() && (
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(comment)}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                  >
                    {deletingId === comment.id ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    ) : (
                      <Trash className="w-4 h-4 mr-1" />
                    )}
                    Delete
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <CommentForm
        productId={productId}
        comment={editingComment}
        onSuccess={handleCommentSuccess}
      />
    </div>
  );
}
