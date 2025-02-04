import { getColorById } from "@/app/api/dashboard/server-api/colors";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import ColorForm from "@/components/dashboard/forms/color-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function UpdateCity({ params }: ServerPageProps) {
  const { id } = await params;
  const color = await getColorById(id);
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">Edit Color</Typography>
          <ColorForm defaultValue={color} />
        </CardContent>
      </Card>
    </Box>
  );
}
