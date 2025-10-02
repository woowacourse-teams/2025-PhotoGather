import type { RouteObject } from 'react-router-dom';

export type RouteHandle = {
  header?: boolean;
  starField?: boolean;
  highlight?: boolean;
};

export type AppRouteObject = RouteObject & {
  handle?: RouteHandle;
};
