import { Navigate, useLocation } from "react-router-dom";
import APIService from "./APISErvice";

// Wrapper for protected routes
export function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!APIService.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

// Wrapper for admin-only routes
export function AdminRoute({ children }) {
  const location = useLocation();

  if (!APIService.isAdmin()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
