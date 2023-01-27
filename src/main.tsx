import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import store from "./store/redux-store/store-config";

import { ThemeConfig } from "./styles/theme";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeConfig>
            <App />
            <ReactQueryDevtools />
          </ThemeConfig>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
