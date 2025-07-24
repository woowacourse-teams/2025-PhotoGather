import downloadLoadingSpinner from '@assets/loading-spinner.gif';
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
import { INFORMATION } from '../../../constants/messages';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import usePhotosBySpaceId from '../../../hooks/usePhotosBySpaceId';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import { tryAsync } from '../../../utils/tryAsync';
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
    usePhotosBySpaceId({
      reObserve,
      spaceCode: mockSpaceData.code,
    });

  const [isDownloading, setIsDownloading] = useState(false);

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage || isLoading) return;
    fetchPhotosList();
  }, [isFetchSectionVisible, isEndPage]);

  const handleDownload = () => {
    setIsDownloading(true);
    tryAsync(
      async () => {
        setIsDownloading(true);
        const response = await photoService.downloadZip(
          String(mockSpaceData.code),
        );
        const blob = response.data;
        if (!blob) {
          throw new Error(DEBUG_MESSAGES.NO_BLOB);
        }
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'sample.zip';
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      () => {
        setIsDownloading(false);
      },
    );
  };

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
            <SettingSvg fill={theme.colors.white} width="24px" height="24px" />
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
      <S.BottomBlurArea $isHide={isAtPageBottom} />
    </S.Wrapper>
  );
};

export default SpaceHome;
