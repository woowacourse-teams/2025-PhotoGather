import downloadLoadingSpinner from '@assets/loading-spinner.gif';
import { useEffect, useState } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import RoundedButton from '../../../components/@common/buttons/roundedButton/RoundedButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
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

  const {
    photosList,
    isLoading,
    thumbnailPhotoMap,
    isEndPage,
    fetchPhotosList,
  } = usePhotosBySpaceCode({
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

  const initialSelectedPhotoMap = new Map<number, boolean>(
    photosList?.map((photo) => [photo.id, false]) ?? [],
  );

  const [selectedPhotoMap, setSelectedPhotoMap] = useState(
    initialSelectedPhotoMap,
  );

  const toggleSelectedPhoto = (id: number) => {
    setSelectedPhotoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, !newMap.get(id));
      return newMap;
    });
  };

  const resetSelectedPhotoMap = () => {
    setSelectedPhotoMap(initialSelectedPhotoMap);
  };

  const [isSelectMode, setIsSelectMode] = useState(false);
  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    resetSelectedPhotoMap();
  };
  const selectModeButtonText = isSelectMode ? '취소' : '선택';

  const mappingImageOnClick = isSelectMode
    ? toggleSelectedPhoto
    : () => {
        console.log('모달창');
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
            <SettingSvg
              fill={theme.colors.primary20}
              width="24px"
              height="24px"
            />
          }
        />
      </S.InfoContainer>

      {photosList &&
        (photosList.length > 0 ? (
          <>
            <S.ImageManagementContainer>
              <S.ActionBar>
                <RoundedButton
                  text={selectModeButtonText}
                  onClick={toggleSelectMode}
                />
              </S.ActionBar>
              <SpaceManagerImageGrid
                isSelectMode={isSelectMode}
                selectedPhotoMap={selectedPhotoMap}
                photoData={photosList}
                thumbnailUrlList={thumbnailPhotoMap}
                rowImageAmount={3}
                onImageClick={mappingImageOnClick}
              />
            </S.ImageManagementContainer>

            {!isSelectMode && (
              <S.DownloadButtonContainer>
                <FloatingActionButton
                  label="모두 저장하기"
                  icon={<SaveIcon fill={theme.colors.gray06} />}
                  onClick={handleDownload}
                  disabled={isDownloading}
                />
              </S.DownloadButtonContainer>
            )}

            <S.BottomNavigatorContainer>
              <S.TopButtonContainer $isVisible={!isAtPageTop}>
                <FloatingIconButton
                  icon={<ArrowUpSvg fill={theme.colors.white} />}
                  onClick={goToTop}
                />
              </S.TopButtonContainer>
            </S.BottomNavigatorContainer>
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
