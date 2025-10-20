import styled from '@emotion/styled';
import { hexToRgba } from '../utils/hexToRgba';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
`;

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
`;

export const Name = styled.h1`
  ${({ theme }) => theme.typography.header02}
`;

export const Introduction = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray04};
  white-space: pre-line;
`;

export const IconButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const Footer = styled.footer`
  margin-top: auto;
`;

export const Thumbnail = styled.img`
  max-width: 60px;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 1px 3px ${({ theme }) => hexToRgba(theme.colors.gray06, 0.2)};
`;
