import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import userProtectedRoutes from "./userProtectedRoutes";

export default function Routes() {
  const appRoutes = useRoutes([...authRoutes, ...userProtectedRoutes]);
  return appRoutes;
}
