import type { ReactElement } from 'react';

export type OverlayOptions = {
  clickOverlayClose?: boolean;
};

export type OverlayOpenFn = <T = unknown>(
  children: ReactElement,
  options?: OverlayOptions,
) => Promise<T>;
