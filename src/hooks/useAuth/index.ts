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

  let logOutTimer: any;

  const login = (credentials: LoginCredentials) => {
    loginMutation(credentials).then((response) => {
      const loginExpirationDate =
        response.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString();
      setUser({ ...response, expirationDate: loginExpirationDate });

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...response,
          expirationDate: loginExpirationDate,
        })
      );
    });
  };

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
      login(storedData);
    }
  };

  const autoLogout = () => {
    if (user?.id && user.expirationDate) {
      const remainingTime =
        new Date(user.expirationDate).getTime() - new Date().getTime();
      logOutTimer = setTimeout(logout, remainingTime);
      console.log(logOutTimer);
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
