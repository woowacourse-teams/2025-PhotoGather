import { css } from '@emotion/css';
import ReactDOM from 'react-dom/client';

const style = css`
  color: hotpink;
  font-size: 24px;
`;

const App = () => (
  <div className={style}>Hello Emotion + React + TypeScript!</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
