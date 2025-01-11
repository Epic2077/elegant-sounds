import React from "react";

import { Chrome, Github } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "@/auth";
import Link from "next/link";
import SignupField from "./signupField";

export default function SignupFormDemo() {
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
      <h1 className="text-2xl font-bold text-center mb-2">
        Welcome to <span className="text-primary">3legant-Sounds</span>
      </h1>
      <p className="text-balance text-sm text-muted-foreground text-center">
        Enter your details below to create an account.
      </p>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1px] w-full" />
      <SignupField />
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
        <form
          action={async () => {
            "use server";

            await signIn("google");
          }}
        >
          <Button variant="outline" className="w-full">
            <Chrome />
            Login with Google
          </Button>
        </form>
      </div>
      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link href="login/" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
