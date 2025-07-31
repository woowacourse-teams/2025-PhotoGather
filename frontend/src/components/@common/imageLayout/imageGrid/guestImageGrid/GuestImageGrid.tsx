import GuestImageElement from '../../imageElement/guestImageElement/GuestImageElement';
import * as S from '../ImageGrid.common.styles';

interface GuestImageGridProps {
  /** 이미지의 경로를 담은 배열 */
  imageUrlList: string[];
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
}

const GuestImageGrid = ({
  imageUrlList,
  rowImageAmount,
}: GuestImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {imageUrlList.map((url, index) => (
        <GuestImageElement
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
          key={index}
          src={url}
          onImageClick={() => {}}
          onDeleteClick={() => {}}
        />
      ))}
    </S.Wrapper>
  );
};

export default GuestImageGrid;
