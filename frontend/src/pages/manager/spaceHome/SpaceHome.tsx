import { useEffect } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import { INFORMATION } from '../../../constants/messages';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import usePhotosBySpaceId from '../../../hooks/usePhotosBySpaceId';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import { mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { targetRef: scrollEndTriggerArea, isIntersecting: hasReachedBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerArea, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const {
    targetRef: fetchTriggerArea,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ isInitialInView: true, rootMargin: '200px' });

  const { isLoading, thumbnailList, isEndPage, fetchPhotosList } =
    usePhotosBySpaceId({
      reObserve,
    });

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage || isLoading) return;
    fetchPhotosList();
  }, [isFetchSectionVisible, isEndPage]);

  return (
    <S.Wrapper>
      <S.InfoContainer ref={scrollTopTriggerArea}>
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
              <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
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
            <S.GiftIcon />
            <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
          </S.NoImageContainer>
        ))}

      <S.IntersectionArea ref={scrollEndTriggerArea} />
      <S.IntersectionArea ref={fetchTriggerArea} />
      <S.ScrollableArea $isHide={hasReachedBottom} />
    </S.Wrapper>
  );
};

export default SpaceHome;
