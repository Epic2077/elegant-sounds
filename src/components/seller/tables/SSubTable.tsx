import { Accordion } from "@/components/ui/accordion";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { TableRow } from "@/components/ui/table";
import { TableCell } from "@mui/material";
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
  return (
    <TableRow>
      <TableCell className="py-0" colSpan={colSpan}>
        <Accordion type="single" collapsible className="w-full">
          yes
        </Accordion>
      </TableCell>
    </TableRow>
  );
}
