import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import { getStorageValue, setStorageValue } from "@/utils/localStorage";
import { User } from "@/types/user";

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(getStorageValue("user"));

  useEffect(() => {
    setStorageValue("user", user);
  }, [user]);

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};

export default UserContextProvider;
