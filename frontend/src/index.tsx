import ReactDOM from 'react-dom/client';
import { css } from '@emotion/css';

const style = css`
  color: hotpink;
  font-size: 24px;
`;

const App = () => <div className={style}>Hello Emotion + React + TypeScript!</div>;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
