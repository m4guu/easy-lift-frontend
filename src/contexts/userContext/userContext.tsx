import { createContext, useContext, useMemo, useEffect } from "react";

import { useAuth } from "../../hooks";

import { User, LoginCredentials } from "../../shared/interfaces";

interface UserContextType {
  isLoading: boolean;
  user?: User;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  resetPassword: (password: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FCWithChildren = ({ children }) => {
  const {
    isLoading,
    user,
    login,
    logout,
    resetPassword,
    autoLogin,
    autoLogout,
  } = useAuth();

  useEffect(() => {
    autoLogin();
    autoLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      user,
      login,
      logout,
      resetPassword,
    }),
    [user, login, logout, resetPassword, isLoading]
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
