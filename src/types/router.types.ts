import { APP_ROUTES } from "./../constants/routes";

export type ReactRouterRoute = {
  path?: string;
  element: React.ReactNode;
  children?: ReactRouterRoute[];
};

export type UserAuthForms = {
  [APP_ROUTES.REGISTER]: React.ReactNode;
  [APP_ROUTES.LOGIN]: React.ReactNode;
};

export type Route = keyof UserAuthForms;
