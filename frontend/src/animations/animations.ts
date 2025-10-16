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

export const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`;

export const fadeOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%); }
  to { opacity: 0; transform: translate(-50%, -52%); }
`;
