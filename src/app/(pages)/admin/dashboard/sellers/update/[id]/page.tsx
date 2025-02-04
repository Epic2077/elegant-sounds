import { getSellerById } from "@/app/api/dashboard/server-api/sellers";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import SellerForm from "@/components/dashboard/forms/seller-form";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default async function UpdateBadgePage({ params }: ServerPageProps) {
  const { id } = await params;
  const seller = await getSellerById(id);
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Edit Seller</Typography>
          <SellerForm defaultValue={seller} />
        </CardContent>
      </Card>
    </Box>
  );
}
