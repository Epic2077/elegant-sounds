"use client";
import { IconButton, TableRow as MuiTableRow, TableCell } from "@mui/material";
import { Fragment, ReactNode, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Column } from "@/app/api/dashboard/server-api/types";
import AISubTable from "./AISubTable";

type Props<T extends { id: string }, G extends { id: string }> = {
  schema: Column<T>[];
  data: T;
  actions?: (row: T) => ReactNode;
  subTable?: {
    header: string;
    schema: Column<G>[];
    key: keyof T;
  };
};

export default function AITableRow<
  T extends { id: string },
  G extends { id: string }
>({ schema, data, subTable, actions }: Props<T, G>) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <MuiTableRow>
        {!!subTable && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {schema.map((item) => (
          <TableCell key={data.id.toString() + item.title}>
            {item.render(data)}
          </TableCell>
        ))}
        {!!actions && (
          <TableCell key={data.id.toString() + "actions"}>
            {actions(data)}
          </TableCell>
        )}
      </MuiTableRow>
      {!!subTable && (
        <AISubTable
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
