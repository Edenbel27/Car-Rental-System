import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CarsPage from "./pages/CarsPage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/User/UserDashboard";
import { useAuth } from "./provider/AuthProvider";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import CarDetail from "./pages/User/CarDetail";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: (
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rent",
        element: <CarsPage />,
      },
      {
        path: "/car/:id",
        element: (
          <ProtectedRoute>
            <CarDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default routes;
