import { createPhotoSelectedMessage } from '../../constants/messages';
import { track } from '../../utils/googleAnalytics/track';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './PhotoSelectionToolBar.styles';

interface PhotoSelectionToolBarProps {
  /** 선택된 사진 개수 */
  selectedCount: number;
  /** 삭제 버튼 클릭 시 실행할 함수 */
  onDelete: () => void;
  /** 다운로드 버튼 클릭 시 실행할 함수 */
  onDownload: () => void;
}

const PhotoSelectionToolBar = ({
  selectedCount,
  onDelete,
  onDownload,
}: PhotoSelectionToolBarProps) => {
  const photoSelectedMessage = createPhotoSelectedMessage(selectedCount);
  return (
    <S.Wrapper>
      <S.Button
        onClick={() => {
          onDelete();
          track.button('selected-delete-button', {
            page: 'space-home',
            section: 'photo-selection-tool-bar',
            action: 'delete-selected',
          });
        }}
      >
        <S.DeleteIcon />
      </S.Button>
      <HighlightText
        text={photoSelectedMessage}
        highlightTextArray={[String(selectedCount)]}
        fontStyle="header03"
        textColorStyle="white"
        highlightColorStyle="accent"
      />
      <S.Button
        onClick={() => {
          onDownload();
          track.button('selected-download-button', {
            page: 'space-home',
            section: 'photo-selection-tool-bar',
            action: 'download-selected',
          });
        }}
      >
        <S.DownloadIcon />
      </S.Button>
    </S.Wrapper>
  );
};

export default PhotoSelectionToolBar;
