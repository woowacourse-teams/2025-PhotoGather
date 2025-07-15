import * as S from './ImageGrid.styles';
import ImageElement from './imageElement/ImageElement';

interface ImageGridProps {
  /** 이미지의 경로를 담은 배열 */
  imageUrlList: string[];
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
  /** 그리드 속 이미지 width */
  imageWidth?: number;
  /** 그리드 속 이미지 height */
  imageHeight?: number;
}

const ImageGrid = ({
  imageUrlList,
  rowImageAmount,
  imageWidth = 200,
  imageHeight = 200,
}: ImageGridProps) => {
  return (
    <S.Wrapper rowImageAmount={rowImageAmount}>
      {imageUrlList.map((url, i) => (
        <ImageElement
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
          key={i}
          src={url}
          width={imageWidth}
          height={imageHeight}
        />
      ))}
    </S.Wrapper>
  );
};

export default ImageGrid;
