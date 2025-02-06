import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export type STableContainerProps = {
  title: string;
  createLink?: string;
  children: ReactNode;
};

export async function STableContainer({
  title,
  createLink,
  children,
}: STableContainerProps) {
  return (
    <div className="mt-2 p-3 px-4 border-2 border-primary rounded-xl">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl">{title}</h1>
        {createLink && (
          <Link href={createLink}>
            <Button variant="default">New {title}</Button>
          </Link>
        )}
      </header>
      <main className="mt-4 px-4">{children}</main>
    </div>
  );
}
