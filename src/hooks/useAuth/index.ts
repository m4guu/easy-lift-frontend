import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../queryHooks/auth/useLogin";

import { PATHS } from "../../pages/paths";
import { User, LoginCredentials } from "../../shared/interfaces";

type UseAuthReturnType = {
  isLoading: boolean;
  user: User | undefined;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  autoLogin: () => void;
  autoLogout: () => void;
  resetPassword: (password: string) => void;
};

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const {
    isLoading: isLogging,
    error: loginError,
    mutateAsync: loginMutation,
  } = useLogin();

  let logOutTimer: number | NodeJS.Timeout | undefined;

  // todo: change response[0] -> response (when backend will be written)
  const login = (credentials: LoginCredentials) => {
    loginMutation(credentials).then((response) => {
      const loginExpirationDate =
        response[0].expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString();

      setUser({ ...response[0], expirationDate: loginExpirationDate });

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...response[0],
          expirationDate: loginExpirationDate,
        })
      );
    });
  };

  // todo: remove expiration date form user --> update User
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("userData");
    navigate(PATHS.default);
  };

  // todo: add funcionality
  const resetPassword = (password: string) => {};

  const autoLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.id &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      const credentials: LoginCredentials = {
        email: storedData.email,
        password: storedData.password,
      };
      login(credentials);
    }
  };

  const autoLogout = () => {
    if (user?.id && user.expirationDate) {
      const remainingTime =
        new Date(user.expirationDate).getTime() - new Date().getTime();
      logOutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  };

  return {
    user,
    isLoading: isLogging,
    login,
    logout,
    resetPassword,
    autoLogin,
    autoLogout,
  };
};

export default useAuth;
