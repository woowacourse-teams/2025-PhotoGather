import type { Photo } from '../../../types/photo.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import * as S from './PhotoGrid.styles';

interface PhotoGridProps {
  photoList: Photo[];
  onPhotoClick?: (photo: Photo) => void;
}

const PhotoGrid = ({ photoList, onPhotoClick }: PhotoGridProps) => {
  return (
    <S.Wrapper>
      {photoList.map((photo) => (
        <S.Image
          key={photo.id}
          src={buildThumbnailUrl({
            path: photo.path,
            replacePath: 'guestbook',
          })}
          alt=""
          onClick={() => onPhotoClick?.(photo)}
        />
      ))}
    </S.Wrapper>
  );
};

export default PhotoGrid;
