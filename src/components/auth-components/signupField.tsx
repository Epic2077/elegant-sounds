"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "@/validation/signupSchema";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SignupRequest } from "@/types/Auth";
import { useAuth } from "@/utils/AuthContext";

const SignupField = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onSubmit = async (data: SignupRequest) => {
    try {
      console.log("Submitting form data:", data);

      const { confirmPassword, ...signupData } = data;
      console.log("Submitting form data after removing confirm:", signupData);

      // Call the signup Api Route
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
        credentials: "include",
      });

      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        // Store the accessToken in memory
        const accessToken = result.tokens.accessToken;
        console.log("Access Token:", accessToken);

        login(result.profile.firstName);

        toast({
          title: "Success!",
          description: "You have signed up successfully.",
        });

        router.push("/home");
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: result.message || "Signup failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      // Handle generic errors
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [isView, setIsView] = useState(false);
  const [isViewCon, setIsViewCon] = useState(false);

  const togglePasswordView = () => setIsView((prev) => !prev);
  const toggleConfirmPasswordView = () => setIsViewCon((prev) => !prev);

  return (
    <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            {...register("firstName")}
            name="firstName"
            id="firstName"
            placeholder="Name"
            type="text"
            required
          />
          <div className="">
            {errors.firstName && (
              <p className="text-red-500 opacity-50 text-xs">
                {errors.firstName.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            {...register("lastName")}
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            type="text"
            required
          />
          <div className="">
            {errors.lastName && (
              <p className="text-red-500 opacity-50 text-xs">
                {errors.lastName.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          {...register("email")}
          id="email"
          placeholder="example@email.com"
          type="email"
          required
        />
        <div className="">
          {errors.email && (
            <p className="text-red-500 opacity-50 text-xs">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            placeholder="••••••••"
            type={isView ? "text" : "password"}
            required
          />
          <button
            type="button"
            onClick={togglePasswordView}
            className="absolute top-2 right-2"
          >
            {isView ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
          </button>
        </div>
        <div className="">
          {errors.password && (
            <p className="text-red-500 opacity-50 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-8 ">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            placeholder="••••••••"
            type={isViewCon ? "text" : "password"}
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordView}
            className="absolute top-2 right-2"
          >
            {isViewCon ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
          </button>
        </div>
        <div className="h-5">
          {errors.confirmPassword && (
            <p className="text-red-500 opacity-50 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button className="w-full" type="submit">
        Sign up
      </Button>
    </form>
  );
};

export default SignupField;
