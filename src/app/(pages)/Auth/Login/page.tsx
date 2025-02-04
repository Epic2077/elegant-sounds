import Image from "next/image";

import { LoginForm } from "@/components/auth-components/login-form";
import { AuthRedirectModal } from "@/modules/AuthRedirectModal";

export default function LoginPage() {
  return (
    <>
      <AuthRedirectModal />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/images/headphone-hero2.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </>
  );
}
