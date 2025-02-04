import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default async function UpdateBadgePage({ params }: ServerPageProps) {
  const { badgeID } = await params;
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Nothing to Edit Here</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
