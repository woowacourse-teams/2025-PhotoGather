import mixpanel from 'mixpanel-browser';
import ReactGA from 'react-ga4';

export const trackPageView = (path: string) => {
  const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

  if (!isProduction) {
    console.log('📊 [Dev] Page View:', path);
    return;
  }

  // Google Analytics 페이지뷰 전송
  const MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_TAG_ID;
  if (MEASUREMENT_ID) {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
    });
  }

  // Mixpanel 페이지뷰 전송
  mixpanel.track('Page View', {
    page: path,
    timestamp: new Date().toISOString(),
  });
};

export const trackButtonClick = (
  buttonName: string,
  additionalData?: Record<string, unknown>,
) => {
  const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

  if (!isProduction) {
    console.log('📊 [Dev] Button Click:', buttonName, additionalData);
    return;
  }

  // Google Analytics 이벤트 전송
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: buttonName,
    ...additionalData,
  });

  // Mixpanel 이벤트 전송
  mixpanel.track('Button Click', {
    button_name: buttonName,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>,
) => {
  const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

  if (!isProduction) {
    console.log('📊 [Dev] Custom Event:', eventName, eventData);
    return;
  }

  // Google Analytics 이벤트 전송
  ReactGA.event({
    category: 'Custom',
    action: eventName,
    ...eventData,
  });

  // Mixpanel 이벤트 전송
  mixpanel.track(eventName, {
    timestamp: new Date().toISOString(),
    ...eventData,
  });
};
