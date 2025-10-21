import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const useGoogleAnalytics = () => {
  const location = useLocation();
  const isDev = import.meta.env.ENVIRONMENT === 'development';
  const MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_TAG_ID;

  useEffect(() => {
    if (isDev || !MEASUREMENT_ID) {
      console.log('🚫 GA4 측정 ID 없음 - 초기화 생략');
      return;
    }

    ReactGA.initialize(MEASUREMENT_ID, {
      gtagOptions: {
        send_page_view: false,
      },
    });
  }, []);

  useEffect(() => {
    if (isDev || !MEASUREMENT_ID) {
      console.log('🚫 GA4 측정 ID 없음 - 페이지 측정 생략');
      return;
    }

    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);
};

export default useGoogleAnalytics;
