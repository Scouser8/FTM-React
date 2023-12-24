export type Route = {
  path: string;
  element: JSX.Element;
  children?: Route[];
};
