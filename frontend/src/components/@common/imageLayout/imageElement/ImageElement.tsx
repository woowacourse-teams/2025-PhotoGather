import defaultImage from '../../../../@assets/images/default_image.png';
import { createImageErrorHandler } from '../../../../utils/createImageErrorHandler';
import * as S from './ImageElement.common.styles';

interface ImageElementProps {
  /** 사진 파일 경로 */
  src: string;
  /** 사진의 ratio */
  ratio?: number;
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick?: () => void;
  /** 사진의 alt 태그 */
  alt?: string;
  /** 사진 하나의 너비 */
  width?: string;
}

const handleError = createImageErrorHandler(defaultImage);

const ImageElement = ({
  src,
  ratio = 1,
  onImageClick = () => {
    console.log('작동');
  },
  alt = '스페이스 이미지',
  width = '100%',
}: ImageElementProps) => {
  return (
    <S.Wrapper $ratio={ratio} onClick={onImageClick} $width={width}>
      <S.Image src={src} alt={alt} onError={handleError} />
    </S.Wrapper>
  );
};

export default ImageElement;
