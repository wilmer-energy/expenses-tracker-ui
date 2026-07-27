import { Navigate, Outlet, useLocation } from "react-router";
import { isAuthenticated } from "@/modules/shared/lib/auth-storage";

export function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
