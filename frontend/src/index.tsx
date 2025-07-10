import ReactDOM from 'react-dom/client';
import * as S from './index.styles';

const App = () => (
  <div className={S.style}>Hello Emotion + React + TypeScript!</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
