import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { Route } from "../types/router.types";

const routes: Route[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
