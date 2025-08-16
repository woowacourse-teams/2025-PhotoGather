import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: -32px -16px;
  padding: 48px 20px;
  background-color: ${({ theme }) => theme.colors.primary10};
  min-height: calc(100vh + 64px);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary20};
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.header01 })};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary20};
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.header02 })};
  color: ${({ theme }) => theme.colors.gray05};
  margin-bottom: 12px;
  position: relative;
`;

export const Paragraph = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })};
  color: ${({ theme }) => theme.colors.gray06};
  line-height: 1.8;
  letter-spacing: 0.02em;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  margin-top: 8px;
`;

export const ListItem = styled.li`
  ${({ theme }) => ({ ...theme.typography.bodyRegular })};
  color: ${({ theme }) => theme.colors.gray05};
  position: relative;
  list-style: none;

  &::before {
    content: '▸';
    position: absolute;
    left: -20px;
    color: ${({ theme }) => theme.colors.primary60};
    font-weight: bold;
  }
`;

export const Footer = styled.div`
  text-align: center;
`;
