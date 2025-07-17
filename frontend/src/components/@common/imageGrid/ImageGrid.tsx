import * as S from './ImageGrid.styles';
import ImageElement from './imageElement/ImageElement';

interface ImageGridProps {
  /** 이미지의 경로를 담은 배열 */
  imageUrlList: string[];
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
}

const ImageGrid = ({ imageUrlList, rowImageAmount }: ImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {imageUrlList.map((url, i) => (
        <ImageElement
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
          key={i}
          src={url}
        />
      ))}
    </S.Wrapper>
  );
};

export default ImageGrid;
