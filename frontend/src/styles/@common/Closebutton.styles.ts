import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';

export const CloseButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray03};
  }
`;
