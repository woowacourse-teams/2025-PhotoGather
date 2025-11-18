import '../instrument';
import ReactDOM from 'react-dom/client';
import App from './App';

// biome-ignore lint/style/noNonNullAssertion : The root element is assumed to exist.
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
