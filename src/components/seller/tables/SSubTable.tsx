"use client";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

type Props<T> = {
  open: boolean;
  header: string;
  data: T[];
  colSpan: number;
  subTitleSchema: {
    title: string;
    render: (row: T) => ReactNode;
  }[];
};

export default function SSubTable<T>({
  open,
  header,
  data,
  subTitleSchema,
  colSpan,
}: Props<T>) {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <>
      <TableRow>
        <TableCell className="py-0" colSpan={colSpan}>
          <Collapsible className="w-full" open={open}>
            <CollapsibleContent>
              <div className="mt-1">
                <div>
                  <h6>{header}</h6>
                </div>
                <Table aria-label="purchases">
                  <TableHeader>
                    <TableRow>
                      {subTitleSchema.map((item) => (
                        <TableCell key={item.title}>{item.title}</TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {safeData.length === 0 && (
                      <TableRow>
                        <TableCell
                          className="text-center"
                          colSpan={subTitleSchema.length}
                        >
                          Nothing Here
                        </TableCell>
                      </TableRow>
                    )}
                    {safeData.map((row) => (
                      <TableRow key={(row as any).id}>
                        {subTitleSchema.map((item) => (
                          <TableCell key={(row as any).id + item.title}>
                            {item.render(row)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
}
