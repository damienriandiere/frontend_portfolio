import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const PrivateRoutes = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
