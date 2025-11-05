import styled from '@emotion/styled';
import Button from '../../../components/@common/buttons/button/Button';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight})`};
  gap: 16px;
`;

export const ProfileContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 32px 0px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  align-items: center;
`;

export const NameContainer = styled.p`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  ${({ theme }) => theme.typography.header03}
  color: ${({ theme }) => theme.colors.white};
`;

export const CreateSpaceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 132px;
  height: 28px;
  padding: 2px 12px;
  border-radius: 50px;
  background-color: ${({ theme }) => hexToRgba(theme.colors.gray05)};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.captionSmall};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const SpaceContainer = styled.div`
  width: 100%;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SpaceList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

export const FilterBlur = styled.div`
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCount = styled.span`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray03};
`;

export const EmptyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 50%;
  align-items: center;
  align-self: center;
`;

export const EmptyTitleContainer = styled.p`
  ${({ theme }) => theme.typography.header02};
  color: ${({ theme }) => theme.colors.white};
`;

export const EmptyDescriptionContainer = styled.p`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray03};
`;

export const DividerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EditInfoButton = styled(Button)`
  color: ${({ theme }) => theme.colors.gray03};
`;
