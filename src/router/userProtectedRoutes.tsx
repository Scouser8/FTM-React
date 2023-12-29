import Home from "../components/Home";
import { APP_ROUTES } from "../constants/routes";
import { ReactRouterRoute } from "../types/router.types";
import PrivateRoutes from "./PrivateRoutes";

const routes: ReactRouterRoute[] = [
  {
    element: <PrivateRoutes />,
    children: [{ path: APP_ROUTES.HOME, element: <Home /> }],
  },
];

export default routes;
