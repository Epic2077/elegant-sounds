import CityForm from "@/components/dashboard/forms/city-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateCity() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Add A New City</Typography>
          <CityForm />
        </CardContent>
      </Card>
    </Box>
  );
}
