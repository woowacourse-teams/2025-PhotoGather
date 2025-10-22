import { trackButtonClick } from '../../utils/analytics';

const useButtonTracking = () => {
  const trackClick = (
    buttonName: string,
    additionalData?: Record<string, unknown>,
  ) => {
    trackButtonClick(buttonName, additionalData);
  };

  return { trackClick };
};

export default useButtonTracking;
