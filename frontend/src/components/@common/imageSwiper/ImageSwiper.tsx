import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import * as S from './ImageSwiper.styles';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import type { LocalFile } from '../../../types/file.type';

interface ImageSwiperProps {
  /** 초기 인덱스 */
  initialIndex: number;
  /** 이미지 정보 */
  imageInfo: LocalFile[];
  /** 현재 인덱스 업데이트 */
  updateCurrentIndex: (index: number) => void;
  /** 슬라이드 간격 (px) */
  spaceBetween?: number;
}

const ImageSwiper = ({
  initialIndex,
  imageInfo,
  updateCurrentIndex,
  spaceBetween = 20,
}: ImageSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null);

  const initIndex = (swiper: SwiperType) => {
    if (initialIndex >= imageInfo.length) {
      console.error('initialIndex is out of range');
      swiper.activeIndex = 0;
      return;
    }
    swiper.activeIndex = initialIndex;
  };

  if (imageInfo.length === 0)
    return (
      <S.NoImageContainer>
        <S.NoImageComment>이미지가 없습니다</S.NoImageComment>
      </S.NoImageContainer>
    );
  return (
    <S.ImageSwiperContainer>
      <Swiper
        /** swiper 스타일 설정 */
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        pagination={{ clickable: true, type: 'fraction' }}
        modules={[Navigation, Pagination, EffectCoverflow]}
        centeredSlides={true}
        grabCursor
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: -40,
          depth: 200,
          slideShadows: false,
        }}
        onInit={(swiper) => {
          initIndex(swiper);
        }}
        onSlideChange={(swiper) => {
          updateCurrentIndex(swiper.activeIndex);
        }}
        ref={swiperRef}
      >
        {imageInfo.map((imageInfo: LocalFile, index) => (
          <SwiperSlide
            key={`${imageInfo.originFile.name}-${index}`}
            style={{ display: 'flex' }}
          >
            <S.Image
              src={imageInfo.previewUrl}
              alt={imageInfo.originFile.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.ImageSwiperContainer>
  );
};

export default ImageSwiper;
