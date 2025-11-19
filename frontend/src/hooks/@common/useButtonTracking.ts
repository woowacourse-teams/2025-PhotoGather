import { useCallback } from 'react';
import { TRY_IT_NOW_SPACE_CODE } from '../../constants/constants';
import { trackButtonClick } from '../../utils/analytics';

const useButtonTracking = (context?: {
  userType?: string;
  spaceCode?: string;
}) => {
  const trackClick = useCallback(
    (buttonName: string, additionalData?: Record<string, unknown>) => {
      const isTryItNowSpace = context?.spaceCode === TRY_IT_NOW_SPACE_CODE.PROD;

      trackButtonClick(buttonName, {
        ...context,
        ...additionalData,
        ...(isTryItNowSpace ? { isTryItNowSpace: true } : {}),
      });
    },
    [context],
  );

  return { trackClick };
};

export default useButtonTracking;
