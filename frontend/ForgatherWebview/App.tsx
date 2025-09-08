import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const WEB_URL = __DEV__ ? 'https://dev.forgather.me' : 'https://forgather.me';

const MY_DOMAINS = ['dev.forgather.me', 'forgather.me'];
const KAKAO_DOMAINS = ['kauth.kakao.com', 'accounts.kakao.com', 'kakao.com'];

const allowedHost = (host: string) =>
  [...MY_DOMAINS, ...KAKAO_DOMAINS].some(
    (h) => host === h || host.endsWith(`.${h}`),
  );

export default function App() {
  const ref = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && ref.current) {
        ref.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  const onShouldStart = (req: any) => {
    const url: string = req.url || '';

    if (url.startsWith('tel:') || url.startsWith('mailto:')) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    if (url.startsWith('kakaotalk://') || url.startsWith('kakao{')) {
      return false; // 외부 열기 금지
    }

    if (
      Platform.OS === 'ios' &&
      req.navigationType === 'click' &&
      !req.isTopFrame
    ) {
      ref.current?.injectJavaScript(
        `window.location.href=${JSON.stringify(url)}; true;`,
      );
      return false;
    }

    try {
      const u = new URL(url);
      if (
        (u.protocol === 'https:' || u.protocol === 'http:') &&
        allowedHost(u.host)
      ) {
        return true;
      }
    } catch {}

    Linking.openURL(url).catch(() => {});
    return false;
  };

  const injectedBefore = `
        (function() {
          window.open = function(url){ window.location.href = url; };
        })(); true;
      `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            inset: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        ref={ref}
        source={{ uri: WEB_URL }}
        domStorageEnabled
        javaScriptEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        allowsInlineMediaPlayback
        startInLoadingState
        setSupportMultipleWindows={false}
        pullToRefreshEnabled={Platform.OS === 'android'}
        onNavigationStateChange={(s) => setCanGoBack(s.canGoBack)}
        onLoadEnd={() => setLoading(false)}
        onShouldStartLoadWithRequest={onShouldStart}
        onCreateWindow={() => false}
        onFileDownload={({ nativeEvent }) => {
          Linking.openURL(nativeEvent.downloadUrl);
        }}
        injectedJavaScriptBeforeContentLoaded={injectedBefore}
        userAgent={`ForgatherWebview/1.0 (iOS) WebView`}
      />
    </SafeAreaView>
  );
}
