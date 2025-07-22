import { useEffect, useState } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import { photoService } from '../../../apis/services/photo.service';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import { DEBUG_MESSAGES } from '../../../constants/debugMessages';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { theme } from '../../../styles/theme';
import type { PhotoListResponse } from '../../../types/api.type';
import type { Photo } from '../../../types/photo.type';
import { goToTop } from '../../../utils/goToTop';
import { parsedImagePath } from '../../../utils/parsedThumbnailPath';
import { mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const PAGE_SIZE = 21;
  const MOCK_SPACE_ID = 1234567890;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photoResponse, setPhotoResponse] = useState<PhotoListResponse | null>(
    null,
  );
  const { photos, currentPage = 1, totalPages = 1 } = photoResponse ?? {};

  const photoList = photos?.map((photo) => {
    // TODO : service 분리
    return `${process.env.IMAGE_BASE_URL}/photogather/contents/${MOCK_SPACE_ID}/thumbnails/${parsedImagePath(photo.path)}_${PRESET}.webp`;
  });

  const isEndPage = currentPage > totalPages;

  // TODO : 깜빡이는 문제 해결
  const { targetRef: scrollEndRef, isIntersecting: isScrollEnd } =
    useIntersectionObserver({});
  const { targetRef: topBoundaryRef, isIntersecting: isTopVisible } =
    useIntersectionObserver({});
  const {
    targetRef: lazyFetchRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({});

  const updateShowPhotos = (photos: Photo[], totalPages: number) => {
    setPhotoResponse((prev) => {
      if (!prev)
        return {
          photos,
          currentPage: 1,
          totalPages,
          pageSize: PAGE_SIZE,
        };
      return {
        ...prev,
        currentPage: prev.currentPage + 1,
        photos: [...prev.photos, ...photos],
      };
    });
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage || isLoading) return;

    setIsLoading(true);

    photoService
      .getBySpaceId(MOCK_SPACE_ID, { page: currentPage, size: 30 })
      .then((res) => {
        if (!res.data) {
          console.warn(DEBUG_MESSAGES.NO_RESPONSE);
          return;
        }
        console.log(res);
        console.log(res.data.photos.length);
        const { photos, totalPages } = res.data;
        updateShowPhotos(photos, totalPages);
        requestAnimationFrame(() => {
          reObserve();
        });
        setIsLoading(false);
      });
  }, [isFetchSectionVisible]);

  return (
    <S.Wrapper>
      <S.InfoContainer ref={topBoundaryRef}>
        <SpaceHeader
          title={mockSpaceData.name}
          description={mockSpaceData.startDate}
          icon={
            <SettingSvg fill={theme.colors.white} width="24px" height="24px" />
          }
        />
      </S.InfoContainer>

      <S.ImageGridContainer>
        <ImageGrid imageUrlList={photoList ?? []} rowImageAmount={3} />
      </S.ImageGridContainer>

      <S.DownloadButtonContainer>
        <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
      </S.DownloadButtonContainer>

      <S.IntersectionArea ref={scrollEndRef} />
      <S.IntersectionArea ref={lazyFetchRef} />

      <S.TopButtonContainer $isVisible={!isTopVisible}>
        <FloatingIconButton
          icon={<ArrowUpSvg fill={theme.colors.white} />}
          onClick={goToTop}
        />
      </S.TopButtonContainer>

      <S.ScrollableArea $isVisible={!isScrollEnd} />
    </S.Wrapper>
  );
};

export default SpaceHome;
