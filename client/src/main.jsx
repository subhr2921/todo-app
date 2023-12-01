import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
const LazyApp = lazy(() => import("./App.jsx"));
import "./assets/css/App.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./utility/context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux"
import store from "./stores"

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <AppContextProvider>
            <LazyApp />
          </AppContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
