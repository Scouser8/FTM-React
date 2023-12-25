import Home from "../components/Home";
import { APP_ROUTES } from "../constants/routes";
import { ReactRouterRoute } from "../types/router.types";

const routes: ReactRouterRoute[] = [
  { path: APP_ROUTES.HOME, element: <Home /> },
];

export default routes;
