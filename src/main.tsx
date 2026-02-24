import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from 'sonner'
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster richColors position="bottom-right" />
    <App />
  </React.StrictMode>
);
