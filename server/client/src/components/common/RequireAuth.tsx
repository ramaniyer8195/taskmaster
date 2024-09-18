import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
};
