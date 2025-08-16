import styled from '@emotion/styled';

export const Wrapper = styled.footer`
  margin-top: 200px;
  padding: 40px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray06};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const FooterLink = styled.a`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray03};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Copyright = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray04};
`;
