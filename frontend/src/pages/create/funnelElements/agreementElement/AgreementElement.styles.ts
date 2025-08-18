import { ReactComponent as CheckIcon } from '@assets/icons/check.svg';
import { ReactComponent as RoundCheckIcon } from '@assets/icons/round-check.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AllAgreeRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  align-items: center;
`;
export const AllAgreeIcon = styled(RoundCheckIcon)<{ isChecked: boolean }>`
  width: 28px;
  color: ${({ isChecked, theme }) => (isChecked ? theme.colors.primary : theme.colors.gray03)};
  cursor: pointer;
`;

export const AllAgreeText = styled.p`
  ${({ theme }) => theme.typography.header03}
`;

export const AgreeRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 31px;
`;

export const AgreeCheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  align-items: center;
`;

export const AgreeCheckIcon = styled(CheckIcon)<{ isChecked: boolean }>`
  width: 24px;
  color: ${({ isChecked, theme }) => (isChecked ? theme.colors.primary : theme.colors.gray03)};
  cursor: pointer;
`;

export const AgreeText = styled.p<{ showDetail: boolean }>`
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ showDetail, theme }) => (showDetail ? theme.colors.gray03 : theme.colors.gray06)};
  text-decoration: ${({ showDetail }) => (showDetail ? 'underline' : 'none')};
  cursor: ${({ showDetail }) => (showDetail ? 'pointer' : 'default')};
`;
