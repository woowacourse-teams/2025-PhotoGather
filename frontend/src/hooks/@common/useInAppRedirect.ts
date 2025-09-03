import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { checkIsIos } from '../../utils/checkIsIos';

const useInAppRedirect = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isKakaoBrowser = userAgent.includes('kakaotalk');
  const isLineBrowser = userAgent.includes('line');
  const isInAppBrowser = /(instagram|twitter)/.test(userAgent);

  const navigate = useNavigate();

  const redirectInKakaoBrowser = (targetUrl: string) => {
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
  };

  const redirectInLineBrowser = (targetUrl: string) => {
    if (targetUrl.indexOf('?') !== -1) {
      window.location.href = `${targetUrl}&openExternalBrowser=1`;
    } else {
      window.location.href = `${targetUrl}?openExternalBrowser=1`;
    }
    console.log('fallback UI 자리');
  };

  const redirectInInAppBrowser = (targetUrl: string) => {
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

  const redirectToExternalBrowser = (targetUrl: string) => {
    if (!(isKakaoBrowser || isLineBrowser || isInAppBrowser)) return;

    navigate(ROUTES.IN_APP_BROWSER, { state: { targetUrl } });
    if (isKakaoBrowser) {
      redirectInKakaoBrowser(targetUrl);
      return;
    }
    if (isLineBrowser) {
      redirectInLineBrowser(targetUrl);
      return;
    }
    if (isInAppBrowser) {
      redirectInInAppBrowser(targetUrl);
      return;
    }
  };

  return { redirectToExternalBrowser };
};

export default useInAppRedirect;
