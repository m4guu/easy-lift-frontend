import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/redux-store/store-config";

import { ThemeConfig } from "./styles/theme";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeConfig>
          <App />
        </ThemeConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
