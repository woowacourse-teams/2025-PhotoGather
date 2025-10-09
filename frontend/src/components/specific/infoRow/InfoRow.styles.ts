import styled from '@emotion/styled';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.dt`
  width: 100%;
  text-align: left;
  min-height: 24px;
  ${({ theme }) => ({
    ...theme.typography.bodyLarge,
  })}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const Value = styled.dd`
  width: 100%;
  text-align: left;
  min-height: 24px;
  ${({ theme }) => ({
    ...theme.typography.bodyRegular,
  })}
  color: ${({ theme }) => theme.colors.gray04};
`;

export const NoValueText = styled.dd`
  width: 100%;
  text-align: left;
  ${({ theme }) => ({
    ...theme.typography.bodyRegular,
  })}
  color: ${({ theme }) => theme.colors.gray03};
`;
