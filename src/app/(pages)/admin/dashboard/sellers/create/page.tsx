import SellerForm from "@/components/dashboard/forms/seller-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateBadge() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Make New Seller</Typography>
          <SellerForm />
        </CardContent>
      </Card>
    </Box>
  );
}
