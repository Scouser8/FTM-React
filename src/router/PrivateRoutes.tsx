import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { getUserSelector } from "../store/selectors/user";
import { APP_ROUTES } from "../constants/routes";

function PrivateRoutes() {
  const { user } = useSelector(getUserSelector);
  return user ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN} />;
}

export default PrivateRoutes;
