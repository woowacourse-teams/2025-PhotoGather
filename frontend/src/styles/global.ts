import { css } from '@emotion/react';
import SUITVariable from '../@assets/fonts/SUIT-Variable.woff2';

export const global = css`
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITVariable}) format('woff2');
    font-display: swap;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  }
  html {
    scroll-behavior: smooth;
  }
  input {
    &:focus {
      border: none;
      outline: none;
    }
  }
  button {
    cursor: pointer;
    border: none;
    &:disabled {
      cursor: default;
    }
  }
`;
