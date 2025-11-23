import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.header02};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray05};
  margin: 0;
`;

export const WorkCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StateMessage = styled.p`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray05};
  text-align: center;
  margin: 40px 0 0;
`;

export const BottomSectionContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;
