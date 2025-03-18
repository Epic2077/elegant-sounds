import { CreateBadgeForm } from "@/components/dashboard/forms/create-badge";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateBadge() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Make A New Badge</Typography>
          <CreateBadgeForm />
        </CardContent>
      </Card>
    </Box>
  );
}
