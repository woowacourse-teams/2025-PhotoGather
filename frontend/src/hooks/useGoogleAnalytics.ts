import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const useGoogleAnalytics = () => {
  const location = useLocation();
  const MEASUREMENT_ID = process.env.GOOGLE_TAG_ID;

  //biome-ignore lint/correctness/useExhaustiveDependencies: GA4 초기화 코드는 첫 마운트시 실행
  useEffect(() => {
    /* 개발모드에서 GA 트래픽확인하기 위해서는 아래 코드 대신 사용 */
    const isDev = process.env.ENVIRONMENT === 'development';
    if (!MEASUREMENT_ID) {
      console.log('🚫 GA4 측정 ID 없음 - 초기화 생략');
      return;
    }

    if (isDev) {
      ReactGA.initialize(MEASUREMENT_ID, {
        // 타입에 맞는 필드만 전달 (원하면 testMode: true 도 가능)
        gtagOptions: {
          debug_mode: true,
          send_page_view: false,
        },
      });

      // DebugView 보장
      // ReactGA.gtag('config', MEASUREMENT_ID, { debug_mode: true });
      console.log(MEASUREMENT_ID, ReactGA.gtag);
    } else ReactGA.initialize(MEASUREMENT_ID);

    // if (!MEASUREMENT_ID) {
    //   console.log('🚫 로컬 환경 - GA4 초기화 건너뜀');
    //   return;
    // }

    // ReactGA.initialize(MEASUREMENT_ID);
    // console.log('✅ GA4 초기화 완료:', MEASUREMENT_ID);
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
