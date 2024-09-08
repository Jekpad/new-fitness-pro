import { useUserContext } from "@/contexts/userContext";
import { ROUTES } from "@/Routes";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useUserContext();
  return user?.uid ? <Outlet /> : <Navigate to={ROUTES.main.path} />;
};

export default PrivateRoute;
