import { css } from '@emotion/react';
import RobotoRegular from '../@assets/fonts/Roboto-Mono-regular.woff2';

export const global = css`
  * {
    box-sizing: border-box;
    font-family: inherit;
    font-synthesis: none;
  }
  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2')
      format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Medium.woff2')
      format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('woff2');
    font-display: swap;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    background-color: #f5f5f5;
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
    background: none;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    &:disabled {
      cursor: default;
    }
  }
  .scroll-lock {
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    overscroll-behavior: none;
    touch-action: none;
  }
`;
