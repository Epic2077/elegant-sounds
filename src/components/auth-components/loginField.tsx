"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "@/hooks/useLogin";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginField = () => {
  const { handleSubmit } = useLogin();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isView, setIsView] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = await handleSubmit({ email, password });
    if (validationErrors) {
      validationErrors.forEach((error) => {
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "default",
        });
      });
    } else {
      toast({
        title: "Success!",
        description: "You have logged in successfully.",
        variant: "default",
      });
    }
  };

  return (
    <form className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="forgot-password/"
            className="ml-auto text-sm underline-offset-4 hover:underline hover:text-primary"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="relative items-center">
          <Input
            placeholder="••••••••"
            id="password"
            type={isView ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isView ? (
            <Eye
              className="absolute right-3 top-1.5 z-10 cursor-pointer w-4"
              onClick={() => {
                setIsView(!isView);
              }}
            />
          ) : (
            <EyeOff
              className="absolute right-3 top-1.5 z-10 cursor-pointer w-4"
              onClick={() => setIsView(!isView)}
            />
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" onClick={onSubmit}>
        Login
      </Button>
    </form>
  );
};

export default LoginField;
