import defaultImage from '../../../../@assets/images/img_default.png';
import * as S from './ImageElement.styles';

interface ImageElementProps {
  /** 사진의 width */
  width: number;
  /** 사진의 height */
  height: number;
  /** 사진 파일 경로 */
  src: string;
  /** 사진을 눌렀을 때 실행할 함수 */
  onImageClick?: () => void;
  /** 사진의 alt 태그 */
  alt?: string;
}

const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.style.background = 'none';
  target.src = defaultImage;
};

const ImageElement = ({
  width,
  height,
  src,
  onImageClick,
  alt = '스페이스 이미지',
}: ImageElementProps) => {
  return (
    <S.Wrapper width={width} height={height} onClick={onImageClick}>
      <S.Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        onError={handleError}
      />
    </S.Wrapper>
  );
};

export default ImageElement;
