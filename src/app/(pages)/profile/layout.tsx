import { AppSidebar } from "@/components/profile/profileLayout/AppSideBar";
import ProfileHeader from "@/components/profile/profileLayout/ProfileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative overflow-x-hidden">
      <div className="flex">
        <SidebarProvider defaultOpen={false} className="fixed">
          <AppSidebar />
          <ProfileHeader />
        </SidebarProvider>
        <main className="grow p-4 pl-20">
          <div className="grid items-center justify-start min-h-[55px]"></div>
          {children}
        </main>
      </div>
    </section>
  );
};

export default ProfileLayout;
