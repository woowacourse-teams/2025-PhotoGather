import { css } from '@emotion/react';

export const global = css`
  * {
    box-sizing: border-box;
    font-family: inherit;
    font-synthesis: none;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    background-color: #f5f5f5;
    word-break: break-all;
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
  textarea {
    resize: none;
    &:focus {
      border: none;
      outline: none;
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
