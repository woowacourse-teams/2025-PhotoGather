import { createPhotoSelectedMessage } from '../../../constants/messages';
import type { IconActionProps } from '../../../types/spaceFooter.type';
import { track } from '../../../utils/googleAnalytics/track';
import HighlightText from '../../@common/highlightText/HighlightText';
import * as S from './PhotoSelectionToolBar.styles';

interface PhotoSelectionToolBarProps {
  /** 선택된 사진 개수 */
  selectedCount: number;
  /** 왼쪽 버튼 리스트 */
  leftIconAction: IconActionProps;
  /** 오른쪽 액션 버튼 리스트 */
  rightIconAction: IconActionProps;
}

const PhotoSelectionToolBar = ({
  selectedCount,
  leftIconAction,
  rightIconAction,
}: PhotoSelectionToolBarProps) => {
  const photoSelectedMessage = createPhotoSelectedMessage(selectedCount);
  return (
    <S.Wrapper>
      <S.Button
        onClick={() => {
          leftIconAction.onClick();
          track.button('selected_delete_button', {
            page: 'space_home',
            section: 'photo_selection_tool-bar',
            action: 'delete_selected',
          });
        }}
      >
        {leftIconAction.icon}
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
          rightIconAction.onClick();
          track.button('selected_download_button', {
            page: 'space_home',
            section: 'photo_selection_tool_bar',
            action: 'download_selected',
          });
        }}
      >
        {rightIconAction.icon}
      </S.Button>
    </S.Wrapper>
  );
};

export default PhotoSelectionToolBar;
