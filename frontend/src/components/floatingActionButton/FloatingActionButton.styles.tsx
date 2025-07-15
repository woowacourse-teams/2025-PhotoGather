import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

type Variant = 'default' | 'disabled';

const color = {
  default: css`
    background-color: ${theme.colors.accent};
    color: ${theme.colors.gray06};

    &:active {
      background-color: ${theme.colors.darkAccent};
      color: ${theme.colors.gray06};
      box-shadow:
        0px 2px 3px 0px rgba(0, 0, 0, 0.25) inset,
        1px 1px 3px 0px #fff inset,
        5px 5px 5px 0px rgba(0, 0, 0, 0.25);
    }
  `,
  disabled: css`
    background-color: ${theme.colors.gray01};
    color: ${theme.colors.gray04};
  `,
};

export const Wrapper = styled.button<{ $variant: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;

  font-weight: ${theme.typography.buttonPrimary.fontWeight};
  font-size: ${theme.typography.buttonPrimary.fontSize};
  line-height: ${theme.typography.buttonPrimary.lineHeight};

  box-shadow:
    1px 1px 3px 0px #fff inset,
    5px 5px 5px 0px rgba(0, 0, 0, 0.25);

    ${({ $variant }) => color[$variant]}
`;
