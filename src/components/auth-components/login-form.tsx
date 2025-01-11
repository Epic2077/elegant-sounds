import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";
import LoginField from "./loginField";
import { signIn } from "@/auth";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <LoginField />
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
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
          <Button type="submit" variant="outline" className="w-full">
            <Chrome />
            Login with Google
          </Button>
        </form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="signup/" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
