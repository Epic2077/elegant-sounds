import {
  Column,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import { Table, TableCaption } from "@/components/ui/table";
import { ReactNode } from "react";

interface SellerTableProps<T extends { id: string }, G extends { id: sting }> {
  schema: Column<T>[];
  data: PaginatedResultApi<T>;
  subTable?: { header: string; schema: Column<G>[]; key: keyof T };
  actions?: (row: T) => ReactNode;
}

export default function SellerTable<
  T extends { id: string },
  G extends { id: string }
>({ schema, data, subTable, actions }: SellerTableProps<T, G>) {
  return (
    <Table>
      <TableCaption />
    </Table>
  );
}
