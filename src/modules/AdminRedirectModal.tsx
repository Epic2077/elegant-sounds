"use client";

import { useAuth } from "@/utils/AuthContext";
import { useUserInfo } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AdminRedirectModal = () => {
  const { isAdmin } = useUserInfo();
  const { logout } = useAuth();
  const [showPage, setShowPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      setShowPage(true);
    }
  }, [isAdmin]);

  const handleLogout = async () => {
    await logout();
    setShowPage(false);
  };

  const handleCancel = () => {
    setShowPage(false);
    router.push("/home");
  };

  if (showPage) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center p-4 z-30 w-screen h-screen">
      <div className="bg-foreground rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Session Alert</h2>
        <p className="mb-4">
          You&apos;re already logged in as a user! Would you like to logout?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Login As Admin
          </button>
        </div>
      </div>
    </div>
  );
};
