import type { Photo } from '../../../../../types/photo.type';
import SpaceManagerImageElement from '../../imageElement/spaceManagerImageElement/SpaceManagerImageElement';
import * as S from '../ImageGrid.common.styles';

interface SpaceManagerImageGridProps {
  photoData: Photo[];
  thumbnailUrlList: Map<number, string>;
  rowImageAmount: number;
  onImageClick: (id: number) => void;
  isSelectMode: boolean;
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
