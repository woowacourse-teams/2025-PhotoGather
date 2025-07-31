import * as C from '../ImageElement.common.styles';
import * as S from './SpaceManagerImageElement.styles';

interface SpaceManagerImageElementProps {
  src: string;
  alt?: string;
  ratio?: number;
  width?: string;
  isSelected: boolean;
  onImageClick: () => void;
}

const SpaceManagerImageElement = ({
  src,
  alt = '스페이스 이미지',
  ratio = 1,
  width = '100%',
  isSelected = true,
  onImageClick,
}: SpaceManagerImageElementProps) => {
  // TODO : ImageElement를 눌렀을 때 작동해야 할 것 (select 모드 / 모달 띄우기 모드)
  // onImageClick 함수 내부에 모달 띄우기 or select 상태 처리 필요
  // 내부에서는 어떤 모드인지 알 필요 없음
  return (
    // biome-ignore lint/a11y/useSemanticElements: button 시맨틱 태그 내부에 button이 존재할 수 없음
    <S.Wrapper
      role="button"
      tabIndex={0}
      aria-label={isSelected ? '선택된 이미지' : '선택되지 않은 이미지'}
      $ratio={ratio}
      $width={width}
      $isSelected={isSelected}
      onClick={onImageClick}
    >
      <C.Image src={src} alt={alt} />
      {isSelected && <S.SelectedMark />}
    </S.Wrapper>
  );
};

export default SpaceManagerImageElement;
