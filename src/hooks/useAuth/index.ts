import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateUserMutation } from "../queryHooks/auth/useUpdateUserMutation";
import { useLogin } from "../queryHooks/auth/useLogin";
import useSnackbar from "../useSnackbar";

import { PATHS } from "../../pages/paths";
import { SnackbarStatus } from "../../shared/enums";
import { User, LoginCredentials } from "../../shared/interfaces";

type UseAuthReturnType = {
  isLoading: boolean;
  user?: User;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  autoLogin: () => void;
  autoLogout: () => void;
  resetPassword: (password: string) => void;
  getAccessToken: () => string | undefined;
};

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { mutateAsync: updateUserQuery, error: updateUserError } =
    useUpdateUserMutation();
  const {
    isLoading: isLogging,
    error: loginError,
    mutateAsync: loginMutation,
  } = useLogin();

  let logOutTimer: number | NodeJS.Timeout | undefined;

  const login = (credentials: LoginCredentials) => {
    loginMutation(credentials).then((response) => {
      const loginExpirationDate =
        response.user.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString();

      if (!response.user.expirationDate) {
        updateUserQuery({
          ...response.user,
          expirationDate: loginExpirationDate,
        });
      }
      setUser({ ...response.user, expirationDate: loginExpirationDate });

      // ? question 1: can i store acces token in local storage in this demo ?
      localStorage.setItem("access_token", JSON.stringify(response.token));
      // Set user to local storage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...response.user,
          expirationDate: loginExpirationDate,
        })
      );
    });
  };

  const logout = () => {
    updateUserQuery({ ...user!, expirationDate: "" }).then(() => {
      setUser(undefined);
      localStorage.removeItem("userData");
      localStorage.removeItem("access_token");
      navigate(PATHS.default);
    });
  };

  // todo: add funcionality
  const resetPassword = (password: string) => {};

  // ? question: can i manage autoLogin in this way ?
  const autoLogin = () => {
    const storedData: User | undefined = JSON.parse(
      localStorage.getItem("userData")!
    );
    if (
      storedData &&
      storedData.id &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      setUser(storedData);
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

  const getAccessToken = () => {
    return JSON.parse(localStorage.getItem("access_token")!);
  };

  useEffect(() => {
    if (updateUserError || loginError) {
      snackbar(
        `We're sorry! The server encountered an internal error. Please try later.`,
        SnackbarStatus.ERROR
      );
    }
  }, [snackbar, updateUserError, loginError]);

  return {
    user,
    isLoading: isLogging,
    login,
    logout,
    resetPassword,
    autoLogin,
    autoLogout,
    getAccessToken,
  };
};

export default useAuth;
