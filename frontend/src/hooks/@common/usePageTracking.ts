import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);
  }, [location]);
};

export default usePageTracking;
