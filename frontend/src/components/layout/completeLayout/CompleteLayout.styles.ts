import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 2 * ${({ theme }) => theme.layout.padding.topBottom} - ${({ theme }) => theme.layout.headerHeight});
`;

export const Message = styled.h1`
  ${({ theme }) => ({ ...theme.typography.header02 })}
  color: ${({ theme }) => theme.colors.gray06};
  text-align: center;
  width: 100%;
  white-space: pre-line;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
