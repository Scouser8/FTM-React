import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import userProtectedRoutes from "./userProtectedRoutes";
import Error404 from "../components/Error404";

export default function Routes() {
  const appRoutes = useRoutes([
    ...authRoutes,
    ...userProtectedRoutes,
    { path: "*", element: <Error404 /> },
  ]);
  return appRoutes;
}
