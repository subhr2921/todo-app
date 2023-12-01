import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
const LazyApp = lazy(() => import("./App.jsx"));
import "./assets/css/App.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./utility/context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter basename="/">
        <CssBaseline />
        <AppContextProvider>
          <LazyApp />
        </AppContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
