import { getProductById } from "@/app/api/dashboard/server-api/products";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import ProductForm from "@/components/dashboard/forms/product-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function UpdateCity({ params }: ServerPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5">Edit Product</Typography>
          <ProductForm defaultValue={product} />
        </CardContent>
      </Card>
    </Box>
  );
}
