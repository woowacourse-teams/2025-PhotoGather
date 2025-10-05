import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 60px;
  aspect-ratio: 1/1;
  position: relative;
`;

export const ThumbnailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;
`;
