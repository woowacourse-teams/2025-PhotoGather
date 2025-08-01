import type { Photo } from '../../../../../types/photo.type';
import * as C from '../ImageElement.common.styles';
import * as S from './SpaceManagerImageElement.styles';

interface SpaceManagerImageElementProps {
  /** 이미지 데이터 */
  data: Photo;
  /** 이미지 alt 태그 */
  alt?: string;
  /** 이미지 비율 */
  ratio?: number;
  /** 이미지 너비 */
  width?: string;
  /** 이미지 선택 여부 */
  isSelected: boolean;
  /** 이미지 클릭 시 실행할 함수 */
  onImageClick: (id: number) => void;
  /** 이미지 썸네일 주소 */
  thumbnailUrl: string;
  /** 이미지 선택 모드 여부 */
  isSelectMode: boolean;
}

const SpaceManagerImageElement = ({
  data,
  alt = '스페이스 이미지',
  ratio = 1,
  width = '100%',
  isSelected = true,
  onImageClick,
  thumbnailUrl,
  isSelectMode,
}: SpaceManagerImageElementProps) => {
  return (
    // biome-ignore lint/a11y/useSemanticElements: button 시맨틱 태그 내부에 button이 존재할 수 없음
    <C.Wrapper
      role="button"
      tabIndex={0}
      aria-label={isSelected ? '선택된 이미지' : '선택되지 않은 이미지'}
      $ratio={ratio}
      $width={width}
      onClick={() => onImageClick(data.id)}
    >
      <C.Image src={thumbnailUrl} alt={alt} />
      {isSelectMode && isSelected && <S.SelectedMark />}
      {isSelectMode && <S.Overlay $isSelected={isSelected} />}
    </C.Wrapper>
  );
};

export default SpaceManagerImageElement;
