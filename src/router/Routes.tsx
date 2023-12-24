import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import userAuthenticatedRoutes from "./userAuthenticatedRoutes";

export default function Routes() {
  const appRoutes = useRoutes([...authRoutes, ...userAuthenticatedRoutes]);
  return appRoutes;
}
