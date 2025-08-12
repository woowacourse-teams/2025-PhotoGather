import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const useGoogleAnalytics = () => {
  const location = useLocation();
  const MEASUREMENT_ID = process.env.GOOGLE_TAG_ID;

  //biome-ignore lint/correctness/useExhaustiveDependencies: GA4 초기화 코드는 첫 마운트시 실행
  useEffect(() => {
    /* development에서의 GA 디버깅용 코드 */
    // const isDev = process.env.ENVIRONMENT === 'development';
    // if (!MEASUREMENT_ID) {
    //   console.log('🚫 GA4 측정 ID 없음 - 초기화 생략');
    //   return;
    // }
    // if (isDev) {
    //   ReactGA.initialize(MEASUREMENT_ID, {
    //     gtagOptions: {
    //       debug_mode: true, // 디버그 모드
    //       send_page_view: false, // 자동으로 page view 전송 방지
    //     },
    //   });
    // } else ReactGA.initialize(MEASUREMENT_ID);

    /* production에서의 코드 */
    if (!MEASUREMENT_ID) {
      console.log('🚫 로컬 환경 - GA4 초기화 건너뜀');
      return;
    }
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('✅ GA4 초기화 완료:', MEASUREMENT_ID);
  }, []);

  //biome-ignore lint/correctness/useExhaustiveDependencies: GA4 페이지뷰 전송 코드는 페이지 변경 시 실행
  useEffect(() => {
    if (MEASUREMENT_ID) {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      });
      console.log('📊 페이지뷰 전송:', location.pathname);
    }
  }, [location]);
};

export default useGoogleAnalytics;
