import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { SnackbarProvider } from "notistack";

import { Provider } from "react-redux";
import store from "./store/redux-store/store-config";

import UserProvider from "./contexts/userContext";

import { ThemeConfig } from "./styles/theme";

import App from "./App";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <BrowserRouter>
            <UserProvider>
              <Provider store={store}>
                <ThemeConfig>
                  <App />
                </ThemeConfig>
              </Provider>
            </UserProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
