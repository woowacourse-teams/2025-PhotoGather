import { css } from '@emotion/react';
import SUITVariable from '../@assets/fonts/SUIT-Variable.woff2';

export const global = css`
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITVariable}) format('woff2');
    font-display: swap;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  }
`;
