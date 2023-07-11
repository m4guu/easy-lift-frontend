import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { useCreateUserMutation } from "../queryHooks/auth/useCreateUserMutation";
import { useLogin } from "../queryHooks/auth/useLogin";
import { useLogout } from "../queryHooks/auth/useLogout";
import { useAutoLogin } from "../queryHooks/auth/useAutoLogin";

import useSnackbar from "../useSnackbar";

import { SnackbarStatus, Status } from "../../shared/enums";
import {
  User,
  LoginCredentials,
  CreateUser,
  Error,
} from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

type UseAuthReturnType = {
  isLogging: boolean;
  isRegistering: boolean;
  registerStatus: "error" | "loading" | "idle" | "success";
  registerError: Error | null;
  login: (credentials: LoginCredentials) => void;
  registerUser: UseMutateAsyncFunction<void, unknown, CreateUser, unknown>;
  logout: () => void;
  autoLogin: () => void;
  user?: User;
};

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const { mutateAsync: autoLoginMutation } = useAutoLogin();
  const { mutateAsync: logoutMutation } = useLogout();
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

  const login = (credentials: LoginCredentials) => {
    loginMutation(credentials).then((response) => {
      setUser(response.user);
      // Set user to local storage
      localStorage.setItem("userData", JSON.stringify(response.user));

      // redirect to home page when user is configured and to config page when is not
      navigate(
        response.user.isConfigured ? PATHS.CONFIGURATION : PATHS.default
      );
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
        loginError?.message || registerError?.message,
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
    registerError,
    login,
    registerUser,
    logout,
    autoLogin,
  };
};

export default useAuth;
