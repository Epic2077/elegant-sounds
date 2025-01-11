import SignupForm from "@/components/auth-components/signup-form";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/login-hero.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
