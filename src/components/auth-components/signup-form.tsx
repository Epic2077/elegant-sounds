import React from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Chrome, Github } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "@/auth";
import Link from "next/link";

export default function SignupFormDemo() {
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
      <h1 className="text-2xl font-bold text-center mb-2">
        Welcome to <span className="text-primary">3legant-Sounds</span>
      </h1>
      <p className="text-balance text-sm text-muted-foreground text-center">
        Enter your details below to create an account.
      </p>

      <form className="my-6">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              name="firstName"
              id="firstName"
              placeholder="Name"
              type="text"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              type="text"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            name="email"
            id="email"
            placeholder="example@email.com"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </div>
        <div className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="ConfirmPassword"
            placeholder="••••••••"
            type="password"
            required
          />
        </div>

        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <form
          action={async () => {
            "use server";

            await signIn("github");
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            <Github />
            Login with GitHub
          </Button>
        </form>
        <Button variant="outline" className="w-full">
          <Chrome />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link
          href="login/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
