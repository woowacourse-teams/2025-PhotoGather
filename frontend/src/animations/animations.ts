import { keyframes } from '@emotion/react';

export const fadeUp = keyframes`
  to{
    opacity: 1;
    transform: translateY(-10px);
  }
  from{
    opacity: 0;
    transform: translateY(0);
  }
`;
