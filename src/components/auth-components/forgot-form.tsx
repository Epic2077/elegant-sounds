import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as motion from "motion/react-client";

export default function ForgotPassword() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-auto flex flex-col gap-6"
    >
      <div className="flex min-h-screen flex-col items-center justify-center  py-12 px-4 bg-transparent">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter the email address associated with your account and
              we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="z-10"
              />
            </div>
            <Button type="submit" className="w-full">
              Reset password
            </Button>
          </form>
          <div className="flex justify-center">
            <Link
              href="login/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
