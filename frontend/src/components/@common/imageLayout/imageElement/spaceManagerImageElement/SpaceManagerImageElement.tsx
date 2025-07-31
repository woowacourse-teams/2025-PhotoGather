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
}

const SpaceManagerImageElement = ({
  data,
  alt = '스페이스 이미지',
  ratio = 1,
  width = '100%',
  isSelected = true,
  onImageClick,
  thumbnailUrl,
}: SpaceManagerImageElementProps) => {
  // TODO : ImageElement를 눌렀을 때 작동해야 할 것 (select 모드 / 모달 띄우기 모드)
  // onImageClick 함수 내부에 모달 띄우기 or select 상태 처리 필요
  // 내부에서는 어떤 모드인지 알 필요 없음
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
      {isSelected && <S.SelectedMark />}
      <S.Overlay $isSelected={isSelected} />
    </C.Wrapper>
  );
};

export default SpaceManagerImageElement;
