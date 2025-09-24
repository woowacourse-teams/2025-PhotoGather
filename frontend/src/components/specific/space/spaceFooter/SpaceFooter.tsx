import { UpwardArrowIcon } from '../../../../@assets/icons';
import { theme } from '../../../../styles/theme';
import type { IconActionProps } from '../../../../types/soaceFooter.type';
import { goToTop } from '../../../../utils/goToTop';
import FloatingIconButton from '../../../@common/buttons/floatingIconButton/FloatingIconButton';
import PhotoSelectionToolBar from '../../photoSelectionToolBar/PhotoSelectionToolBar';
import * as S from './SpaceFooter.styles';

interface SpaceFooterProps {
  isAtPageTop: boolean;
  isSelectMode: boolean;
  selectedPhotosCount: number;
  leftIconAction: IconActionProps;
  rightIconAction: IconActionProps;
}

const SpaceFooter = ({
  isAtPageTop,
  isSelectMode,
  selectedPhotosCount,
  leftIconAction,
  rightIconAction,
}: SpaceFooterProps) => {
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
      {isSelectMode && (
        <PhotoSelectionToolBar
          selectedCount={selectedPhotosCount}
          leftIconAction={{
            icon: leftIconAction.icon,
            onClick: () => leftIconAction.onClick(),
          }}
          rightIconAction={{
            icon: rightIconAction.icon,
            onClick: () => rightIconAction.onClick(),
          }}
        />
      )}
    </S.BottomNavigatorContainer>
  );
};

export default SpaceFooter;
