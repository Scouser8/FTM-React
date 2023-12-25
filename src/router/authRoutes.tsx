import UserAuthentication from "../components/Forms/Auth/UserAuthentication";
import { APP_ROUTES } from "../constants/routes";
import { ReactRouterRoute } from "../types/router.types";

const routes: ReactRouterRoute[] = [
  {
    path: APP_ROUTES.REGISTER,
    element: <UserAuthentication route={APP_ROUTES.REGISTER} />,
  },
  {
    path: APP_ROUTES.LOGIN,
    element: <UserAuthentication route={APP_ROUTES.LOGIN} />,
  },
];

export default routes;
