import type { SpaceManagerImageElementHandlers } from '../../../../../types/imageGrid.type';
import type { Photo } from '../../../../../types/photo.type';
import SpaceManagerImageElement from '../../imageElement/spaceManagerImageElement/SpaceManagerImageElement';
import * as S from '../ImageGrid.common.styles';

interface SpaceManagerImageGridProps extends SpaceManagerImageElementHandlers {
  /** 이미지 데이터 */
  photoData: Photo[];
  /** 이미지 썸네일 주소 목록 */
  thumbnailUrlList: Map<number, string>;
  /** 한 줄에 표시할 이미지 개수 */
  rowImageAmount: number;
  /** 선택 모드 여부 */
  isSelectMode: boolean;
  /** 선택된 이미지 목록 */
  selectedPhotoMap: Map<number, boolean>;
}

const SpaceManagerImageGrid = ({
  photoData,
  thumbnailUrlList,
  rowImageAmount,
  onImageClick,
  selectedPhotoMap,
  isSelectMode,
}: SpaceManagerImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {photoData.map((photo) => (
        <SpaceManagerImageElement
          key={photo.id}
          data={photo}
          thumbnailUrl={thumbnailUrlList.get(photo.id) ?? ''}
          isSelected={selectedPhotoMap.get(photo.id) ?? false}
          isSelectMode={isSelectMode}
          onImageClick={() => onImageClick(photo.id)}
        />
      ))}
    </S.Wrapper>
  );
};

export default SpaceManagerImageGrid;
