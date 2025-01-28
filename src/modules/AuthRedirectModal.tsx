"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export const AuthRedirectModal = () => {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn, isLoading]);

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    router.push("/home");
  };

  if (!showModal || isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center p-4 z-30">
      <div className="bg-foreground rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Session Alert</h2>
        <p className="mb-4">
          You&apos;re already logged in! Would you like to logout?
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
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
