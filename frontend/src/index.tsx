import '../instrument';
import ReactDOM from 'react-dom/client';
import App from './App';

// biome-ignore lint/style/noNonNullAssertion : 루트에서 non-null 무시
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/streaming-download.js', {
      scope: '/',
      type: 'module',
    })
    .then(() => {
      console.log('Download worker registered');
    })
    .catch(console.error);
}
