import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export type LeftIcons = 'logo' | 'profile' | 'back';

export type RouteHandle = {
  starField?: boolean;
  highlight?: boolean;
  noHamburger?: boolean;
  headerIcon?: {
    leftIcon?: LeftIcons;
  };
  noHeader?: boolean;
  noFooter?: boolean;
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

export type AppRouteObject = AppIndexRouteObject | AppNonIndexRouteObject;

export interface AppIndexRouteObject extends IndexRouteObject {
  handle?: RouteHandle;
}
export interface AppNonIndexRouteObject extends NonIndexRouteObject {
  handle?: RouteHandle;
  children?: AppRouteObject[];
}
