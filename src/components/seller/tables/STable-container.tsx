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
    <div>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl">{title}</h1>
        {createLink && (
          <Link href={createLink}>
            <Button variant="default">New {title}</Button>
          </Link>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
