import { css } from '@emotion/react';
import RobotoRegular from '../@assets/fonts/Roboto-Mono-regular.woff2';

export const global = css`
  * {
    box-sizing: border-box;
    font-family: inherit;
    font-synthesis: none;
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
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .skip-link {
    position: absolute;
    top: -400px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px 16px;
    z-index: 1000;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
  }

  .skip-link:focus {
    top: 0;
  }
`;
