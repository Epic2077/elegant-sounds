import { getBadgeById } from "@/app/api/dashboard/server-api/badges";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import { CreateBadgeForm } from "@/components/dashboard/forms/create-badge";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default async function UpdateBadgePage({ params }: ServerPageProps) {
  const { badgeID } = await params;
  const badge = await getBadgeById(badgeID);
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Edit User</Typography>
          <CreateBadgeForm defaultValue={badge} />
        </CardContent>
      </Card>
    </Box>
  );
}
