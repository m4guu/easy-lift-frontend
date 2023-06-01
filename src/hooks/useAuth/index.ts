import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { useUpdateUserMutation } from "../queryHooks/auth/useUpdateUserMutation";
import { useCreateUserMutation } from "../queryHooks/auth/useCreateUserMutation";
import { useLogin } from "../queryHooks/auth/useLogin";
import useSnackbar from "../useSnackbar";

import { PATHS } from "../../pages/paths";
import { SnackbarStatus, Status } from "../../shared/enums";
import { User, LoginCredentials, CreateUser } from "../../shared/interfaces";

type UseAuthReturnType = {
  isLogging: boolean;
  isRegistering: boolean;
  registerStatus: "error" | "loading" | "idle" | "success";
  user?: User;
  login: (credentials: LoginCredentials) => void;
  registerUser: UseMutateAsyncFunction<void, unknown, CreateUser, unknown>;
  logout: () => void;
  autoLogin: () => void;
  autoLogout: () => void;
  resetPassword: (password: string) => void;
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
  const {
    isLoading: isRegistering,
    status: registerStatus,
    error: registerError,
    mutateAsync: registerUser,
  } = useCreateUserMutation();

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
      navigate(PATHS.default);
    });
  };

  // todo: add funcionality
  const resetPassword = (password: string) => {};

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

  useEffect(() => {
    if (updateUserError || loginError || registerError) {
      snackbar(
        `We're sorry! The server encountered an internal error. Please try later.`,
        SnackbarStatus.ERROR
      );
    }
    if (registerStatus === Status.SUCCESS && !isRegistering) {
      snackbar(
        `You have been thoughtfully registered. You can now log in.`,
        SnackbarStatus.SUCCESS
      );
    }
  }, [
    snackbar,
    updateUserError,
    loginError,
    registerError,
    registerStatus,
    isRegistering,
  ]);

  return {
    user,
    isLogging,
    isRegistering,
    registerStatus,
    login,
    registerUser,
    logout,
    resetPassword,
    autoLogin,
    autoLogout,
  };
};

export default useAuth;
