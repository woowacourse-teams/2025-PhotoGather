import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

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

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 300px;
  padding: 120px 0px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.header02}
  color: ${({ theme }) => theme.colors.white};
  white-space: pre-wrap;
`;

export const SmallTitle = styled.p`
  ${({ theme }) => theme.typography.header03}
  color: ${({ theme }) => theme.colors.white};
  white-space: pre-wrap;
`;

export const SubTitle = styled.h2`
  ${({ theme }) => theme.typography.header02}
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 36px;
  white-space: pre-wrap;
`;

export const DescriptionBox = styled.div`
  ${({ theme }) => theme.typography.bodyRegular}
`;

export const DescriptionTitle = styled.p`
  ${({ theme }) => theme.typography.header03}
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.8)};
  border-radius: 4px;
  padding: 12px 8px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  white-space: pre-wrap;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 30px;
  white-space: pre-wrap;
`;

export const TitleImage = styled.img`
  width: 210px;
`;

export const ScreenshotBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 172px;
  align-items: center;
  width: 80%;
`;

export const ScreenshotBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Bubble = styled.div<{
  $direction?: 'left' | 'right';
  $color?: 'light' | 'dark';
}>`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ $color, theme }) => ($color === 'light' ? theme.colors.gray06 : theme.colors.white)};
  background-color: ${({ $color, theme }) =>
    hexToRgba($color === 'light' ? theme.colors.gray01 : theme.colors.gray06, 0.8)};
  width: 100%;
  padding: 12px 8px;
  line-height: 36px;
  white-space: pre-wrap;
  text-align: center;
  border-radius: 24px;
`;

export const ScreenshotDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  justify-content: center;
`;

export const Screenshot = styled.img`
  width: 100%;
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.white})
    drop-shadow(0 0 10px ${({ theme }) => hexToRgba(theme.colors.gray02, 0.5)});
`;

export const ScrollIconContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), transparent);
  width: ${({ theme }) => theme.layout.width};
  height: 48px;
`;

export const ScrollTopContainer = styled.div`
  position: fixed;
  right: calc(
    (100vw - ${({ theme }) => theme.layout.width}) / 2 +
      ${({ theme }) => theme.layout.padding.leftRight} * 2
  );
  bottom: ${({ theme }) => theme.layout.padding.topBottom};
  z-index: ${({ theme }) => theme.zIndex.fixedButton};
`;
