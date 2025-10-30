import { useCallback } from 'react';
import { trackButtonClick } from '../../utils/analytics';

const useButtonTracking = (context?: {
  userType?: string;
  spaceCode?: string;
}) => {
  const trackClick = useCallback(
    (buttonName: string, additionalData?: Record<string, unknown>) => {
      trackButtonClick(buttonName, {
        ...context,
        ...additionalData,
      });
    },
    [context],
  );

  return { trackClick };
};

export default useButtonTracking;
