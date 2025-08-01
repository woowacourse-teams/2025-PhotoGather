import { createPhotoSelectedMessage } from '../../constants/messages';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './PhotoSelectionToolBar.styles';

interface PhotoSelectionToolBarProps {
  selectedCount: number;
}

const PhotoSelectionToolBar = ({
  selectedCount,
}: PhotoSelectionToolBarProps) => {
  const photoSelectedMessage = createPhotoSelectedMessage(selectedCount);
  return (
    <S.Wrapper>
      <S.Button>
        <S.DeleteIcon />
      </S.Button>
      <HighlightText
        text={photoSelectedMessage}
        highlightTextArray={[String(selectedCount)]}
        fontStyle="header03"
        textColorStyle="white"
        highlightColorStyle="accent"
      />
      <S.Button>
        <S.DownloadIcon />
      </S.Button>
    </S.Wrapper>
  );
};

export default PhotoSelectionToolBar;
