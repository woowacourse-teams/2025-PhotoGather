import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const borderButtonStyles = {
  selected: (theme: Theme) => css`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
    ${theme.typography.buttonSecondary}
    transition: color 0.3s, border-color 0.3s, background-color 0.3s;

    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray04};
      background-color: ${theme.colors.grayBackground};
      border: 1px solid ${theme.colors.gray03};
    }

    &:active {
      background-color: ${theme.colors.primary10};
      border: 1px solid ${theme.colors.primary};
    }
  `,

  unselected: (theme: Theme) => css`
    background-color: transparent;
    color: ${theme.colors.gray03};
    border: 1px solid ${theme.colors.gray03};
    ${theme.typography.buttonSecondary}

    &:active {
      background-color: ${theme.colors.gray01};
      border: 1px solid ${theme.colors.gray03};
    }
  `,
};

export const Wrapper = styled.button<{
  $variant: keyof typeof borderButtonStyles;
}>`
  width: 100%;
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  ${({ $variant, theme }) => borderButtonStyles[$variant](theme)}

  &:disabled {
    pointer-events: none;
    color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
    border-color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  flex-grow: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
  white-space: pre-wrap;
  text-align: left;
`;
