import { getCategoryById } from "@/app/api/dashboard/server-api/categories";
import { ServerPageProps } from "@/app/api/dashboard/server-api/types";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function UpdateCategory({ params }: ServerPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);
  return (
    <Box maxWidth={500}>
      <Card>
        <CardContent>
          <Typography variant="h5">ویرایش دسته بندی</Typography>
          <CategoryForm defaultValue={category} />
        </CardContent>
      </Card>
    </Box>
  );
}
