import { User } from "@/types/user";
import { createContext, useContext } from "react";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const userContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
