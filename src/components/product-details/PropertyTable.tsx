// components/product-details/ProductPropertiesTable.tsx
"use client";

import { JSX } from "react";

interface Column<T> {
  title: string;
  accessor: keyof T | ((row: T) => JSX.Element);
  className?: string;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductPropertiesTableProps {
  specifications: Array<{
    title: string;
    value: string;
    isDefault: boolean;
    id: string;
  }>;
}

const specificationSchema: Column<{
  title: string;
  value: string;
  isDefault: boolean;
  id: string;
}>[] = [
  {
    title: "Property",
    accessor: "title",
    className: "font-medium text-primary",
  },
  {
    title: "Value",
    accessor: "value",
    className: "text-muted-foreground",
  },
];

export default function ProductPropertiesTable({
  specifications,
}: ProductPropertiesTableProps) {
  return (
    <section className=" border rounded-xl overflow-hidden">
      <Table className="bg-muted/50">
        <TableHeader className="bg-muted">
          <TableRow>
            {specificationSchema.map((column) => (
              <TableCell
                key={column.title}
                className={`py-3 px-6 ${column.className}`}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {specifications.map((spec) => (
            <TableRow key={spec.id} className="hover:bg-muted/30">
              {specificationSchema.map((column) => (
                <TableCell
                  key={`${spec.id}-${column.title}`}
                  className={`py-3 px-6 ${column.className}`}
                >
                  {typeof column.accessor === "function"
                    ? column.accessor(spec)
                    : spec[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
