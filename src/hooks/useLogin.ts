import { useCallback } from "react";
import { loginSchema } from "@/validation/loginSchema";
import z from "zod";

export const useLogin = () => {
  const handleSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        // Validate data
        await loginSchema.parseAsync(data);
        // Perform login logic here (e.g., API call)
        console.log("Login successful", data);
        return null; // No errors
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors; // Return validation errors
        }
        return null; // Handle other errors if necessary
      }
    },
    []
  );

  return { handleSubmit };
};
