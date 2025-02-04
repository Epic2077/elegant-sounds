import ColorForm from "@/components/dashboard/forms/color-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateCity() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Add A New Color</Typography>
          <ColorForm />
        </CardContent>
      </Card>
    </Box>
  );
}
