"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );
  const router = useRouter();

  const login = (username: string) => {
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
