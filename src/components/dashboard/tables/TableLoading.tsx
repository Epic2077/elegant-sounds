import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

type Props = {
  columnCount: number;
};

export default function TableLoading({ columnCount }: Props) {
  const temp = new Array(columnCount);
  return (
    <Table>
      <TableBody>
        <TableRow>
          {temp.map((item, index) => (
            <TableCell key={index} sx={{ minHeight: 10 }}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
