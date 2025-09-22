import styled from '@emotion/styled';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const ButtonWrapper = styled.button<{ $color: string }>`
  width: 100%;
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  border-radius: 12px;

  &:disabled {
    color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
    border-color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
  }
`;

export const BorderButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;
