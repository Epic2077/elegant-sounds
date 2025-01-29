"use client";

import { Profile } from "@/types/Profile";
import { User } from "@/types/User";
// import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  isAdmin: boolean;
  isUser: boolean;
  profile: Profile | null;
  user: User | null;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  //   const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/api/auth/userInfo", {
        credentials: "include",
      });

      //   if (!res.ok) throw new Error("User Role Validation Failed");
      //   console.log(res);

      if (res.status === 401) {
        // router.push("/auth/login");
        console.log("AccessToken Probably Expired!");
      }

      const data = await res.json();

      // Update state with fetched data
      setUser(data.user);
      setProfile(data.profile);

      // Update roles based on the user's role
      setIsAdmin(data.user.role === 3); // Assuming role 3 is admin
      setIsUser(data.user.role === 1); // Assuming role 1 is user
    } catch (error) {
      console.log("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ isAdmin, isUser, profile, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserInfo must be used within an UserProvider");
  }
  return context;
};
