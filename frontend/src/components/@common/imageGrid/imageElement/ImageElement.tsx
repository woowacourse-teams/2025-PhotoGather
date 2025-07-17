import defaultImage from '../../../../@assets/images/img_default.png';
import { createImageErrorHandler } from '../../../../utils/createImageErrorHandler';
import * as S from './ImageElement.styles';

interface ImageElementProps {
  /** 사진 파일 경로 */
  src: string;
  /** 사진의 ratio */
  ratio?: number;
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick?: () => void;
  /** 사진의 alt 태그 */
  alt?: string;
}

const handleError = createImageErrorHandler(defaultImage);

const ImageElement = ({
  src,
  ratio = 1,
  onImageClick,
  alt = '스페이스 이미지',
}: ImageElementProps) => {
  return (
    <S.Wrapper $ratio={ratio} onClick={onImageClick}>
      <S.Image src={src} alt={alt} onError={handleError} />
    </S.Wrapper>
  );
};

export default ImageElement;
