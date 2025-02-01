import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateBadge() {
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            You Can&apos;t Actually make a new Order
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
