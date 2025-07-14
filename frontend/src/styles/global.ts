import { css } from '@emotion/react';

export const global = css`
  @font-face {
    font-family: 'SUIT';
    src: url('/fonts/SUIT-Variable.woff2') format('woff2');
    font-display: swap;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  }
`;
