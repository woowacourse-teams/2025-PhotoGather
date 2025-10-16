import styled from '@emotion/styled';
import { fadeIn, fadeOut } from '../../../../animations/animations';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: ${fadeIn} 0.4s ease forwards;

  &.fade-out {
    animation: ${fadeOut} 0.4s ease forwards;
  }
`;

export const TextContainer = styled.p`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.typography.captionSmall};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.white};

  svg {
    width: 50px;
    height: 50px;
  }
`;
