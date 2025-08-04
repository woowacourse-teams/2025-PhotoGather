import downloadLoadingSpinner from '@assets/loading-spinner.gif';
import { useEffect } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import { INFORMATION } from '../../../constants/messages';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import useDownload from '../../../hooks/useDownload';
import usePhotosBySpaceCode from '../../../hooks/usePhotosBySpaceCode';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import { mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const { isLoading, thumbnailList, isEndPage, fetchPhotosList } =
    usePhotosBySpaceCode({
      reObserve,
      spaceCode: mockSpaceData.code,
    });

  const { isDownloading, handleDownload } = useDownload({
    spaceName: mockSpaceData.name,
  });
  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage || isLoading) return;
    fetchPhotosList();
  }, [isFetchSectionVisible, isEndPage]);

  //TODO: useDownload 훅에서 navigate 분리
  // const handleUploadClick = () => {
  //   handleDownload();
  //   navigate(ROUTES.COMPLETE.DOWNLOAD);
  // };

  return (
    <S.Wrapper>
      {isDownloading && (
        <S.LoadingSpinnerContainer>
          <img src={downloadLoadingSpinner} alt="loading" />
        </S.LoadingSpinnerContainer>
      )}
      <S.InfoContainer ref={scrollTopTriggerRef}>
        <SpaceHeader
          title={mockSpaceData.name}
          description={mockSpaceData.startDate}
          icon={
            <SettingSvg
              fill={theme.colors.primary20}
              width="24px"
              height="24px"
            />
          }
        />
      </S.InfoContainer>

      {thumbnailList &&
        (thumbnailList.length > 0 ? (
          <>
            <S.ImageGridContainer>
              <ImageGrid imageUrlList={thumbnailList} rowImageAmount={3} />
            </S.ImageGridContainer>

            <S.DownloadButtonContainer>
              <FloatingActionButton
                label="모두 저장하기"
                icon={<SaveIcon />}
                onClick={handleDownload}
                disabled={isDownloading}
              />
            </S.DownloadButtonContainer>

            <S.TopButtonContainer $isVisible={!isAtPageTop}>
              <FloatingIconButton
                icon={<ArrowUpSvg fill={theme.colors.white} />}
                onClick={goToTop}
              />
            </S.TopButtonContainer>
          </>
        ) : (
          <S.NoImageContainer>
            <S.Icon />
            <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
          </S.NoImageContainer>
        ))}

      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <S.IntersectionArea ref={fetchTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} />
    </S.Wrapper>
  );
};

export default SpaceHome;
