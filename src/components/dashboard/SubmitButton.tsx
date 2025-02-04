"use client";

import {
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={disabled || pending} {...rest}>
      {pending ? (
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CircularProgress size={12} />
          <Typography>Submitting </Typography>
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
}
