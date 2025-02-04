import { getPropertiesById } from "@/app/api/dashboard/server-api/property";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import PropertyForm from "@/components/dashboard/forms/property-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function UpdateProperty({ params }: ServerPageProps) {
  const { id } = await params;
  const Property = await getPropertiesById(id);
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Edit Properties</Typography>
          <PropertyForm defaultValue={Property} />
        </CardContent>
      </Card>
    </Box>
  );
}
