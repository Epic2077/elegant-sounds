import { BrandForm } from "@/components/dashboard/forms/brand-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateCity() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Add A New Brand</Typography>
          <BrandForm />
        </CardContent>
      </Card>
    </Box>
  );
}
