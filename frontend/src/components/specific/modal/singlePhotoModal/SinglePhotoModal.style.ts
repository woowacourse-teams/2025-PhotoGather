import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;

export const Image = styled.img`
max-width: ${({ theme }) => `calc(${theme.layout.width} - 40px)`};
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
`;
