import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressElement = styled.div<{ $isFilled: boolean }>`
  position: relative;
  flex: 1;
  height: 5px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray01};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary60};
    border-radius: 20px;
    transform: scaleX(${({ $isFilled }) => ($isFilled ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.5s;
  }
`;
