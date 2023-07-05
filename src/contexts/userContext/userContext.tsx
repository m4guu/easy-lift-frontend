import { createContext, useContext, useMemo, useEffect } from "react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { useAuth } from "../../hooks";

import {
  Error as CustomError,
  User,
  LoginCredentials,
  CreateUser,
} from "../../shared/interfaces";

interface UserContextType {
  isLogging: boolean;
  isRegistering: boolean;
  registerStatus: "error" | "loading" | "idle" | "success";
  registerError: CustomError | null;
  login: (credentials: LoginCredentials) => void;
  registerUser: UseMutateAsyncFunction<void, unknown, CreateUser, unknown>;
  autoLogin: () => void;
  logout: () => void;
  user?: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FCWithChildren = ({ children }) => {
  const {
    isLogging,
    isRegistering,
    registerStatus,
    user,
    registerError,
    login,
    registerUser,
    logout,
    autoLogin,
  } = useAuth();

  useEffect(() => {
    // autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isLogging,
      isRegistering,
      registerStatus,
      user,
      registerError,
      login,
      autoLogin,
      registerUser,
      logout,
    }),
    [
      user,
      registerError,
      login,
      autoLogin,
      registerUser,
      logout,
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
