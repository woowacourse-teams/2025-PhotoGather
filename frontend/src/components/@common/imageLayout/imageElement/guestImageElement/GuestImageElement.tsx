import defaultImage from '../../../../../@assets/images/default_image.png';
import type { PreviewFile } from '../../../../../types/file.type';
import type { GuestImageElementHandlers } from '../../../../../types/imageGrid.type';
import { createImageErrorHandler } from '../../../../../utils/createImageErrorHandler';
import * as C from '../ImageElement.common.styles';
import * as S from './GuestImageElement.styles';

interface GuestImageElementProps extends GuestImageElementHandlers {
  /** 사진 데이터 */
  data: PreviewFile;
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
    onDeleteClick(data.id);
    e.stopPropagation();
  };
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onImageClick(data.id);
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
      onClick={() => onImageClick(data.id)}
      onKeyDown={handleEnterKeyDown}
    >
      <C.Image
        src={data.path}
        alt={alt}
        onError={handleError}
        className="clarity-mask-photo"
      />
      <S.CloseButton onClick={handleDeleteClick}>
        <S.Icon />
      </S.CloseButton>
    </C.Wrapper>
  );
};

export default GuestImageElement;
