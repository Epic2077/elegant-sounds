import ProductForm from "@/components/dashboard/forms/product-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function CreateProductPage() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5">Add New Product</Typography>
          <ProductForm />
        </CardContent>
      </Card>
    </Box>
  );
}
