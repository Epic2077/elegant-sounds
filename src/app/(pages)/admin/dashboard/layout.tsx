import DrawerHeader from "@/components/dashboard/dashboard-layout/components/DrawerHeader";
import DashboardHeader from "@/components/dashboard/dashboard-layout/DashboardHeader";
import DrawerProvider from "@/components/dashboard/dashboard-layout/DrawerProvider";
import MiniDrawer from "@/components/dashboard/dashboard-layout/MiniDrawer";
import QueryProvider from "@/components/dashboard/QueryProvider";
import { AdminRedirectModal } from "@/modules/AdminRedirectModal";
import { Box } from "@mui/material";

async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminRedirectModal />
      <QueryProvider>
        <Box sx={{ display: "flex" }}>
          <DrawerProvider>
            <DashboardHeader />
            <MiniDrawer />
          </DrawerProvider>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </QueryProvider>
    </>
  );
}

export default DashboardLayout;
