import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
  </Provider>
);
