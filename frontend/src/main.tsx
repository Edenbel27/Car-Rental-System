import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
