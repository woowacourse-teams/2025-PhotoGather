import { useEffect, useState } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import { DEBUG_MESSAGES } from '../../../constants/debugMessages';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { theme } from '../../../styles/theme';
import type { PhotoListResponse } from '../../../types/api.type';
import { goToTop } from '../../../utils/goToTop';
import { mockGetPhotos, mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const PAGE_SIZE = 21;

  const [isLoading, setIsLoading] = useState(false);
  const [photoResponse, setPhotoResponse] = useState<PhotoListResponse | null>(
    null,
  );
  const { photos, currentPage = 1, totalPages = 1 } = photoResponse ?? {};
  const photoList = photos?.map((photo) => photo.path);
  const isEndPage = currentPage > totalPages;

  // TODO : 깜빡이는 문제 해결
  const { targetRef: scrollEndRef, isIntersecting: isScrollEnd } =
    useIntersectionObserver({});
  const { targetRef: topBoundaryRef, isIntersecting: isTopVisible } =
    useIntersectionObserver({});
  const { targetRef: lazyFetchRef, isIntersecting: isFetchSectionVisible } =
    useIntersectionObserver({});

  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage) return;

    setIsLoading(true);

    mockGetPhotos(1234567890, { page: currentPage, pageSize: 21 }).then(
      (res) => {
        console.log(res);
        if (!res) {
          console.warn(DEBUG_MESSAGES.NO_RESPONSE);
          return;
        }
        const { photos, totalPages } = res;
        setPhotoResponse((prev) => {
          if (!prev)
            return {
              photos,
              currentPage: res.currentPage + 1,
              totalPages,
              pageSize: PAGE_SIZE,
            };
          return {
            ...prev,
            photos: [...prev.photos, ...photos],
            currentPage: prev.currentPage + 1,
            totalPages,
            pageSize: PAGE_SIZE,
          };
        });
        setIsLoading(false);
      },
    );
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
      <S.LazyFetchSection ref={lazyFetchRef} />

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
