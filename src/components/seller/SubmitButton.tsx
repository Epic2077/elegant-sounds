"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";
import { CircularProgress } from "@mui/material";

export default function SubmitButton({
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={disabled || pending} {...rest}>
      {pending ? (
        <div className="gap-1 flex flex-row items-center">
          <CircularProgress size={12} />
          <p className="text-sm">Submitting</p>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
