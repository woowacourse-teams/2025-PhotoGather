import ImageElement from '../../imageElement/ImageElement';
import * as S from '../ImageGrid.common.styles';

interface SpaceManagerImageGridProps {
  imageUrlList: string[];
  rowImageAmount: number;
}

const SpaceManagerImageGrid = ({
  imageUrlList,
  rowImageAmount,
}: SpaceManagerImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {imageUrlList.map((url, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
        <ImageElement key={index} src={url} />
      ))}
    </S.Wrapper>
  );
};

export default SpaceManagerImageGrid;
