import { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';

export const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }

  return context;
};
