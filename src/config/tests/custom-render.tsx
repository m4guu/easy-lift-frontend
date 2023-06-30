import React, { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { RenderOptions, render } from "@testing-library/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeConfig } from "../../styles/theme";
import { UserProvider } from "../../contexts/userContext/userContext";

import store from "../../store/redux-store/store-config";

const ProvidersWrapper: React.FCWithChildren = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <BrowserRouter>
              <UserProvider>
                <Provider store={store}>
                  <ThemeConfig>{children}</ThemeConfig>
                </Provider>
              </UserProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ProvidersWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
