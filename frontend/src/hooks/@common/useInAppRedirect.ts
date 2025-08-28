import { useEffect } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { AppRouteObject } from '../../types/route.type';
import { checkIsIos } from '../../utils/checkIsIos';

const useInAppRedirect = () => {
  const navigate = useNavigate();

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isInAppBrowserAllowPage = current?.handle?.isInAppBrowserAllow;

  const redirectInKakaoBrowser = (targetUrl: string) => {
    navigate(ROUTES.IN_APP_BROWSER);
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
  };

  const redirectInInAppBrowser = (targetUrl: string) => {
    navigate(ROUTES.IN_APP_BROWSER);
    if (checkIsIos()) {
      window.location.href = `x-safari-${targetUrl}`;
    } else {
      if (!isAlreadyInAppRedirected(targetUrl)) {
        const noSchemeTargetUrl = targetUrl.replace(/^https?:\/\//, '');
        window.location.href = `intent://${noSchemeTargetUrl}#Intent;scheme=https;S.browser_fallback_url=${encodeURIComponent(
          targetUrl + '?__inapp_redirected=1',
        )};end`;
      }
    }
  };

  const isAlreadyInAppRedirected = (targetUrl: string) => {
    return targetUrl.includes('__inapp_redirected');
  };

  const redirectInLineBrowser = (targetUrl: string) => {
    navigate(ROUTES.IN_APP_BROWSER);
    if (location.indexOf('?') !== -1) {
      window.location.href = `${targetUrl}&openExternalBrowser=1`;
    } else {
      window.location.href = `${targetUrl}?openExternalBrowser=1`;
    }
    console.log('fallback UI 자리');
  };

  const location = useLocation().pathname;
  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaoBrowser = userAgent.includes('kakaotalk');
    const isLineBrowser = userAgent.includes('line');
    const isInAppBrowser = /(instagram|twitter)/.test(userAgent);

    const targetUrl = `${process.env.DOMAIN}${location}`;

    if (isKakaoBrowser && !isInAppBrowserAllowPage) {
      redirectInKakaoBrowser(targetUrl);
    }
    if (isLineBrowser && !isInAppBrowserAllowPage) {
      redirectInLineBrowser(targetUrl);
    }
    if (isInAppBrowser && !isInAppBrowserAllowPage) {
      redirectInInAppBrowser(targetUrl);
    }
  }, []);
};

export default useInAppRedirect;
