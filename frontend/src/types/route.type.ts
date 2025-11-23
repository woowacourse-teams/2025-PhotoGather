import type { RouteObject } from 'react-router-dom';

export type RouteHandle = {
  header?: boolean;
  starField?: boolean;
  highlight?: boolean;
};

export interface IconAction {
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavigateInfo {
  path: string;
  name: string;
  external?: boolean;
}

export type AppRouteObject = RouteObject & {
  handle?: RouteHandle;
};
