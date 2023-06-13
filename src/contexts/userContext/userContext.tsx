import { createContext, useContext, useMemo, useEffect } from "react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { useAuth } from "../../hooks";

import { User, LoginCredentials, CreateUser } from "../../shared/interfaces";

interface UserContextType {
  isLogging: boolean;
  isRegistering: boolean;
  registerStatus: "error" | "loading" | "idle" | "success";
  user?: User;
  login: (credentials: LoginCredentials) => void;
  autoLogin: () => void;
  registerUser: UseMutateAsyncFunction<void, unknown, CreateUser, unknown>;
  logout: () => void;
  resetPassword: (password: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FCWithChildren = ({ children }) => {
  const {
    isLogging,
    isRegistering,
    registerStatus,
    user,
    login,
    registerUser,
    logout,
    resetPassword,
    autoLogin,
  } = useAuth();

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isLogging,
      isRegistering,
      registerStatus,
      user,
      login,
      autoLogin,
      registerUser,
      logout,
      resetPassword,
    }),
    [
      user,
      login,
      autoLogin,
      registerUser,
      logout,
      resetPassword,
      isLogging,
      isRegistering,
      registerStatus,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
