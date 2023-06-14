import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { useCreateUserMutation } from "../queryHooks/auth/useCreateUserMutation";
import { useLogin } from "../queryHooks/auth/useLogin";
import { useLogout } from "../queryHooks/auth/useLogout";
import { useAutoLogin } from "../queryHooks/auth/useAutoLogin";

import useSnackbar from "../useSnackbar";

import { SnackbarStatus, Status } from "../../shared/enums";
import { User, LoginCredentials, CreateUser } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

type UseAuthReturnType = {
  isLogging: boolean;
  isRegistering: boolean;
  registerStatus: "error" | "loading" | "idle" | "success";
  user?: User;
  login: (credentials: LoginCredentials) => void;
  registerUser: UseMutateAsyncFunction<void, unknown, CreateUser, unknown>;
  logout: () => void;
  autoLogin: () => void;
};

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const {
    isLoading: isLogging,
    error: loginError,
    mutateAsync: loginMutation,
  } = useLogin();

  const { mutateAsync: autoLoginMutation } = useAutoLogin();
  const { mutateAsync: logoutMutation } = useLogout();

  const {
    isLoading: isRegistering,
    status: registerStatus,
    error: registerError,
    mutateAsync: registerUser,
  } = useCreateUserMutation();

  const login = (credentials: LoginCredentials) => {
    loginMutation(credentials).then((response) => {
      setUser(response.user);
      // Set user to local storage
      localStorage.setItem("userData", JSON.stringify(response.user));
    });
  };

  const logout = () => {
    logoutMutation().then(() => {
      localStorage.removeItem("userData");
      // Refresh the current page
      navigate(0);
    });
  };

  const autoLogin = () => {
    autoLoginMutation().then((response) => {
      setUser(response.user);
      // Set user to local storage
      localStorage.setItem("userData", JSON.stringify(response.user));
    });
  };

  useEffect(() => {
    if (loginError || registerError) {
      snackbar(
        `We're sorry! The server encountered an internal error. Please try later.`,
        SnackbarStatus.ERROR
      );
    }
  }, [snackbar, loginError, registerError]);
  useEffect(() => {
    if (registerStatus === Status.SUCCESS && !isRegistering) {
      snackbar(
        `You have been thoughtfully registered. You can now log in.`,
        SnackbarStatus.SUCCESS
      );
    }
  }, [registerStatus, isRegistering, snackbar]);

  return {
    user,
    isLogging,
    isRegistering,
    registerStatus,
    login,
    registerUser,
    logout,
    autoLogin,
  };
};

export default useAuth;
