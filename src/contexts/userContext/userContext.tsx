import { createContext, useContext, useMemo, useEffect } from "react";

import { useAuth } from "../../hooks";

import { User, LoginCredentials } from "../../shared/interfaces";
import { axiosInstance } from "../../services/api/HttpService";
import { ApiHeaders } from "../../shared/enums";

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
    getAccessToken,
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

  useEffect(() => {
    if (user) {
      axiosInstance.interceptors.request.use((config) => {
        const token = getAccessToken();
        if (config.headers && token) {
          config.headers[ApiHeaders.AUTHORIZATION] = `Bearer ${token}`;
        }
        return config;
      });
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

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
