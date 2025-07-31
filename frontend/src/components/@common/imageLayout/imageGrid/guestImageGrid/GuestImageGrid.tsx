import type { PreviewFile } from '../../../../../types/file.type';
import GuestImageElement from '../../imageElement/guestImageElement/GuestImageElement';
import * as S from '../ImageGrid.common.styles';

interface GuestImageGridProps {
  /** 이미지의 경로를 담은 배열 */
  photoData: PreviewFile[];
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
  /** 이미지 클릭 시 실행되는 함수 */
  onImageClick: (id: number) => void;
  /** 이미지 삭제 시 실행되는 함수 */
  onDeleteClick: (id: number) => void;
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
