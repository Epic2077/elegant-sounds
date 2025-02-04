"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { loginSchema } from "@/validation/loginSchema"; // You'll need to create this

type LoginFormData = {
  email: string;
  password: string;
};

const LoginField = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isView, setIsView] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Submitting form data:", data);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        login();

        toast({
          title: "Login Success",
          description: "You have been logged in.",
        });

        router.push("/home");
      } else {
        toast({
          title: "Error",
          description: result.message || "Login failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in login onSubmit:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const togglePasswordView = () => setIsView((prev) => !prev);

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="m@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message?.toString()}
          </p>
        )}
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

        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            placeholder="••••••••"
            type={isView ? "text" : "password"}
          />
          <button
            type="button"
            onClick={togglePasswordView}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isView ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message?.toString()}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginField;
