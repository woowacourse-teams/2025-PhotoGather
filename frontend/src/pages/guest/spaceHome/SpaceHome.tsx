import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import { mockImageList, mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { targetRef: scrollEndRef, isIntersecting: isScrollEnd } =
    useIntersectionObserver({
      threshold: 0.5,
    });
  const { targetRef: topBoundaryRef, isIntersecting: isTopVisible } =
    useIntersectionObserver({
      threshold: 0.5,
    });

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

      <ImageGrid imageUrlList={mockImageList} rowImageAmount={3} />

      <S.DownloadButtonContainer>
        <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
      </S.DownloadButtonContainer>

      <S.IntersectionArea ref={scrollEndRef} />

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
