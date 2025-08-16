import styled from '@emotion/styled';
import type { IconPosition } from './KakaoLoginButton';

export const KakaoStyledButton = styled.button<{
  $iconPosition: IconPosition;
}>`
  width: 100%;
  display: flex;
  padding: 12px 20px;
    ${({ $iconPosition }) => $iconPosition === 'center' && { justifyContent: 'center' }}
    ${({ $iconPosition }) => $iconPosition === 'left' && { justifyContent: 'space-between' }}
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.kakaoTalk};
  border-radius: 12px;
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
  font-family: initial;

  & > p {
    ${({ $iconPosition }) => $iconPosition === 'left' && { flexGrow: 1 }}
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.p`
  color: rgba(0, 0, 0, 0.85);
`;
