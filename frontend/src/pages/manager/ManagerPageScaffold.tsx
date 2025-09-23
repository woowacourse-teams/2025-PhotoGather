import { UpwardArrowIcon } from '../../@assets/icons';
import { GiftImg } from '../../@assets/images';
import FloatingIconButton from '../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import { INFORMATION } from '../../constants/messages';
import { ManagerScaffoldProvider } from '../../contexts/ManagerScaffoldContext';
import useManagerScaffold from '../../hooks/useManagerScaffold';
import { ScrollableBlurArea } from '../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../styles/theme';
import { goToTop } from '../../utils/goToTop';
import * as S from './ManagerPageScaffold.styles';

interface CompoundComponentProps {
  children: React.ReactNode;
}

const ManagerPageScaffold = ({ children }: CompoundComponentProps) => {
  return (
    <ManagerScaffoldProvider>
      <ManagerPageScaffold.Root>{children}</ManagerPageScaffold.Root>
    </ManagerScaffoldProvider>
  );
};

export default ManagerPageScaffold;

ManagerPageScaffold.Root = ({ children }: CompoundComponentProps) => {
  const { isAtPageBottom, isAtPageTop, hideBlurAreaTriggerRef } =
    useManagerScaffold();

  return (
    <S.Wrapper>
      {children}
      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
      <ScrollableBlurArea $isHide={isAtPageTop} $position="top" />
    </S.Wrapper>
  );
};

ManagerPageScaffold.Header = ({ children }: CompoundComponentProps) => {
  const { scrollTopTriggerRef } = useManagerScaffold();

  return (
    <S.InfoContainer ref={scrollTopTriggerRef}>{children}</S.InfoContainer>
  );
};

ManagerPageScaffold.ImageContainer = ({ children }: CompoundComponentProps) => {
  return <S.ImageManagementContainer>{children}</S.ImageManagementContainer>;
};

ManagerPageScaffold.BottomFloatingButton = ({
  children,
}: CompoundComponentProps) => {
  return (
    <S.BottomFloatingButtonContainer>
      {children}
    </S.BottomFloatingButtonContainer>
  );
};

ManagerPageScaffold.NoImageBox = () => {
  return (
    <S.NoImageContainer>
      <S.GiftIconImage src={GiftImg} />
      <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
    </S.NoImageContainer>
  );
};

ManagerPageScaffold.BottomNavigator = ({
  isSelectMode,
  children,
}: {
  children: React.ReactNode;
  isSelectMode: boolean;
}) => {
  const { isAtPageTop } = useManagerScaffold();
  return (
    <S.BottomNavigatorContainer>
      <S.TopButtonContainer $isVisible={!isAtPageTop}>
        {!isSelectMode && (
          <FloatingIconButton
            icon={<UpwardArrowIcon fill={theme.colors.white} />}
            onClick={goToTop}
          />
        )}
      </S.TopButtonContainer>
      {isSelectMode && children}
    </S.BottomNavigatorContainer>
  );
};
