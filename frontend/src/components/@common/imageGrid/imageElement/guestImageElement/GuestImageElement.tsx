import defaultImage from '../../../../../@assets/images/default_image.png';
import { createImageErrorHandler } from '../../../../../utils/createImageErrorHandler';
import * as C from '../ImageElement.common.styles';
import * as S from './GuestImageElement.styles';

interface GuestImageElementProps {
  /** 사진 파일 경로 */
  src: string;
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick?: () => void;
  /** 사진의 alt 태그 */
  alt?: string;
  /** 사진 하나의 너비 */
  width?: string;
}

const GuestImageElement = ({
  src,
  alt = '스페이스 이미지',
  width = '100%',
  onImageClick,
}: GuestImageElementProps) => {
  const handleError = createImageErrorHandler(defaultImage);
  return (
    <S.Wrapper $ratio={1} $width={width} onClick={onImageClick}>
      <C.Image src={src} alt={alt} onError={handleError} />
      <S.CloseButton>
        <S.Icon />
      </S.CloseButton>
    </S.Wrapper>
  );
};

export default GuestImageElement;
