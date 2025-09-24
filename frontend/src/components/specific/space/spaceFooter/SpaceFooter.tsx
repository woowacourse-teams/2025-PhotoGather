import { UpwardArrowIcon } from '../../../../@assets/icons';
import { theme } from '../../../../styles/theme';
import { goToTop } from '../../../../utils/goToTop';
import FloatingIconButton from '../../../@common/buttons/floatingIconButton/FloatingIconButton';
import PhotoSelectionToolBar from '../../photoSelectionToolBar/PhotoSelectionToolBar';
import * as S from './SpaceFooter.styles';

interface SpaceFooterProps {
  isAtPageTop: boolean;
  isSelectMode: boolean;
  selectedPhotosCount: number;
  selectedPhotoIds: number[];
  tryDeleteSelectedPhotos: (photoIds: number[]) => void;
  trySelectedDownload: (photoIds: number[]) => void;
}

const SpaceFooter = ({
  isAtPageTop,
  isSelectMode,
  selectedPhotosCount,
  selectedPhotoIds,
  tryDeleteSelectedPhotos,
  trySelectedDownload,
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
          onDelete={() => tryDeleteSelectedPhotos(selectedPhotoIds)}
          onDownload={() => trySelectedDownload(selectedPhotoIds)}
        />
      )}
    </S.BottomNavigatorContainer>
  );
};

export default SpaceFooter;
