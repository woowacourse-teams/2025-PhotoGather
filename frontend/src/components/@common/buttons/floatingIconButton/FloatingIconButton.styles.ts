import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  white-space: nowrap;

  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
