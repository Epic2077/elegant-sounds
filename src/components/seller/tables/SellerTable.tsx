"use client";

import {
  Column,
  PaginatedResultApi,
} from "@/app/api/dashboard/server-api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import STableRow from "./STableRows";

interface SellerTableProps<T extends { id: string }, G extends { id: string }> {
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
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            {!!subTable && <TableCell></TableCell>}
            {schema.map((item) => (
              <TableCell key={item.title}>{item.title}</TableCell>
            ))}
            {!!actions && <TableCell key={"actions"}>Action</TableCell>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.length === 0 && (
            <TableRow>
              <TableCell
                className="text-center"
                colSpan={schema.length + +!!actions + +!!subTable}
              >
                No Data Available
              </TableCell>
            </TableRow>
          )}
          {data.results.map((row) => (
            <STableRow
              key={row.id}
              schema={schema}
              data={row}
              subTable={subTable}
              action={actions}
            />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
