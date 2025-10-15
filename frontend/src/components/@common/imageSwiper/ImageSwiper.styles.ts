import styled from '@emotion/styled';

export const NoImageContainer = styled.div`
  width: 100%;
  min-height: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoImageComment = styled.h2`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
  color: ${({ theme }) => theme.colors.gray03};
  text-align: center;
`;

export const ImageSwiperContainer = styled.div`
  width: 100%;
  & .swiper {
    width: 100%;
    min-height: ${({ theme }) => theme.layout.swiper.minHeight};
    padding-bottom: ${({ theme }) => theme.layout.swiper.paddingBottom};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  & .swiper-slide {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.8s ease-in-out;
    border-radius: 4px;
  }
  & .swiper-slide-prev img {
    opacity: 0.8;
  }
  & .swiper-slide-next img {
    opacity: 0.8;
  }
  & .swiper-pagination {
    ${({ theme }) => ({ ...theme.typography.captionSmall })}
    color: ${({ theme }) => theme.colors.gray04};
    position: absolute;
    bottom: 0;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.swiper.imageMaxWidth};
  aspect-ratio: 3/4;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;
