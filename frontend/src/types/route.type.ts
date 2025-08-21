import type { RouteObject } from 'react-router-dom';
import type { HeaderMode } from '../components/layout/global/header/Header';

export type RouteHandle = {
  header?: boolean;
  starField?: boolean;
  highlight?: boolean;
};

export type AppRouteObject = RouteObject & {
  handle?: RouteHandle;
};
