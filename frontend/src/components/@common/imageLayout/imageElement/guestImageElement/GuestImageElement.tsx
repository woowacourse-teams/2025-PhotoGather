import defaultImage from '../../../../../@assets/images/default_image.png';
import type { PreviewFile } from '../../../../../types/file.type';
import { createImageErrorHandler } from '../../../../../utils/createImageErrorHandler';
import * as C from '../ImageElement.common.styles';
import * as S from './GuestImageElement.styles';

interface GuestImageElementProps {
  /** 사진 데이터 */
  data: PreviewFile;
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick: () => void;
  /** 사진 삭제 버튼 클릭 시 실행할 함수 */
  onDeleteClick: () => void;
  /** 사진의 ratio */
  ratio?: number;
  /** 사진의 alt 태그 */
  alt?: string;
  /** 사진 하나의 너비 */
  width?: string;
}

const GuestImageElement = ({
  data,
  alt = '스페이스 이미지',
  ratio = 1,
  width = '100%',
  onImageClick,
  onDeleteClick,
}: GuestImageElementProps) => {
  const handleError = createImageErrorHandler(defaultImage);
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDeleteClick();
    e.stopPropagation();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onImageClick();
    }
  };

  return (
    //biome-ignore lint/a11y/useSemanticElements: button 시맨틱 태그 내부에 button이 존재할 수 없음
    <C.Wrapper
      role="button"
      tabIndex={0}
      aria-label="사진 세부 정보 모달 열기"
      $ratio={ratio}
      $width={width}
      onClick={onImageClick}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <C.Image src={data.path} alt={alt} onError={handleError} />
      <S.CloseButton onClick={handleDeleteClick}>
        <S.Icon />
      </S.CloseButton>
    </C.Wrapper>
  );
};

export default GuestImageElement;
