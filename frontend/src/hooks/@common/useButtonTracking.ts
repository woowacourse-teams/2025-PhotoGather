import { useCallback } from 'react';
import { trackButtonClick } from '../../utils/analytics';

const useButtonTracking = () => {
  const trackClick = useCallback(
    (buttonName: string, additionalData?: Record<string, unknown>) => {
      trackButtonClick(buttonName, additionalData);
    },
    [],
  );

  return { trackClick };
};

export default useButtonTracking;
