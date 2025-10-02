import { createContext } from 'react';
import type { OverlayOpenFn } from '../types/overlay.type';

export const OverlayContext = createContext<OverlayOpenFn | null>(null);
