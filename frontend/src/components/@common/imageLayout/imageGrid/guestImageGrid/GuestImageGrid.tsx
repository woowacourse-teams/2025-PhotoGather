import type { PreviewFile } from '../../../../../types/file.type';
import type { GuestImageElementHandlers } from '../../../../../types/imageGrid.type';
import GuestImageElement from '../../imageElement/guestImageElement/GuestImageElement';
import * as S from '../ImageGrid.common.styles';

interface GuestImageGridProps extends GuestImageElementHandlers {
  /** 이미지의 경로를 담은 배열 */
  photoData: PreviewFile[];
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
}

const GuestImageGrid = ({
  photoData,
  rowImageAmount,
  onImageClick,
  onDeleteClick,
}: GuestImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {photoData.map((photo) => (
        <GuestImageElement
          key={photo.id}
          data={photo}
          onImageClick={() => onImageClick(photo.id)}
          onDeleteClick={() => onDeleteClick(photo.id)}
        />
      ))}
    </S.Wrapper>
  );
};

export default GuestImageGrid;
