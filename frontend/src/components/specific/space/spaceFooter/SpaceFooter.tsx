import { DownloadIcon, UpwardArrowIcon } from '../../../../@assets/icons';
import { theme } from '../../../../styles/theme';
import { track } from '../../../../utils/googleAnalytics/track';
import { goToTop } from '../../../../utils/goToTop';
import FloatingActionButton from '../../../@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../@common/buttons/floatingIconButton/FloatingIconButton';
import PhotoSelectionToolBar from '../../photoSelectionToolBar/PhotoSelectionToolBar';
import * as S from './SpaceFooter.styles';

interface SpaceFooterProps {
  isAtPageTop: boolean;
  isSelectMode: boolean;
  isDownloading: boolean;
  selectedPhotosCount: number;
  selectedPhotoIds: number[];
  tryDeleteSelectedPhotos: (photoIds: number[]) => void;
  trySelectedDownload: (photoIds: number[]) => void;
  tryAllDownload: () => void;
}

const SpaceFooter = ({
  isAtPageTop,
  isSelectMode,
  isDownloading,
  selectedPhotosCount,
  selectedPhotoIds,
  tryDeleteSelectedPhotos,
  trySelectedDownload,
  tryAllDownload,
}: SpaceFooterProps) => {
  return (
    <>
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
      {!isSelectMode && (
        <S.DownloadButtonContainer>
          <FloatingActionButton
            label="모두 저장하기"
            icon={<DownloadIcon fill={theme.colors.gray06} />}
            onClick={() => {
              tryAllDownload();
              track.button('all_download_button', {
                page: 'space_home',
                section: 'space_home',
                action: 'download_all',
              });
            }}
            disabled={isDownloading}
          />
        </S.DownloadButtonContainer>
      )}
    </>
  );
};

export default SpaceFooter;
