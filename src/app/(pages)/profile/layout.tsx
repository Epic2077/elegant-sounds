import { AppSidebar } from "@/components/profile/profileLayout/AppSideBar";
import ProfileHeader from "@/components/profile/profileLayout/ProfileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative overflow-x-hidden">
      <div className="flex">
        <SidebarProvider>
          <AppSidebar />
          <ProfileHeader />
        </SidebarProvider>
      </div>
      <main>{children}</main>
    </section>
  );
};

export default ProfileLayout;
