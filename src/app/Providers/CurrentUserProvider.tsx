"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { UserType } from "@/models/user";

interface UserContextType {
  currentUser: UserType | null;
  // currentUserLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  // currentUserLoading: true,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  // const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      // setCurrentUserLoading(true);
      try {
        if (status === "authenticated") {
          const response = await fetch("/api/search/currentuser");
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        // setCurrentUserLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUser();
    } else {
      // setCurrentUserLoading(false);
    }
  }, [status]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
