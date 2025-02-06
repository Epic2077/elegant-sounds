"user client";

import { Column } from "@/app/api/dashboard/server-api/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Fragment, ReactNode, useState } from "react";
import SSubTable from "./SSubTable";

type Props<T extends { id: string }, G extends { id: string }> = {
  schema: Column<T>[];
  data: T;
  action?: (row: T) => ReactNode;
  subTable?: {
    header: string;
    schema: Column<G>[];
    key: keyof T;
  };
};

export default function STableRow<
  T extends { id: string },
  G extends { id: string }
>({ schema, data, action, subTable }: Props<T, G>) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow>
        {!!subTable && (
          <TableCell>
            <TableCell
              aria-label="expand row"
              className="text-small"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </TableCell>
          </TableCell>
        )}
        {schema.map((item) => (
          <TableCell key={data.id.toString() + item.title}>
            {item.render(data)}
          </TableCell>
        ))}
        {!!action && (
          <TableCell key={data.id.toString() + "action"}>
            {action(data)}
          </TableCell>
        )}
      </TableRow>
      {!!subTable && (
        <SSubTable
          colSpan={schema.length + 2}
          header={subTable.header}
          data={data[subTable.key] as G[]}
          open={open}
          subTitleSchema={subTable.schema}
        />
      )}
    </Fragment>
  );
}
