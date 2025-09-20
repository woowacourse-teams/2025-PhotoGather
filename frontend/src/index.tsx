import '../instrument';
import ReactDOM from 'react-dom/client';
import App from './App';

const waitForServiceWorker = () => {
  return new Promise<void>((resolve) => {
    // 1. 서비스 워커 지원 여부 확인
    if (!('serviceWorker' in navigator)) {
      resolve(); // 지원 안하면 바로 해결
      return;
    }

    // 2. 서비스 워커가 준비되었는지 확인하는 Promise
    const controllerReady = new Promise<void>((resolve) => {
      if (navigator.serviceWorker.controller) {
        resolve(); // 이미 제어 중이면 바로 해결
      } else {
        // 아니면 'controllerchange' 이벤트 대기
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          resolve();
        });
      }
    });

    // 3. 안전망 역할의 타임아웃 Promise
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000)); // 3초 타임아웃

    // 4. 둘 중 먼저 완료되는 Promise의 결과를 따름
    Promise.race([controllerReady, timeout]).then(() => {
      resolve();
    });
  });
};

async function initializeApp() {
  await waitForServiceWorker();

  // biome-ignore lint/style/noNonNullAssertion : The root element is assumed to exist.
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>,
  );
}

initializeApp();
