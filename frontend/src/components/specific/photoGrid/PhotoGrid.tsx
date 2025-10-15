import type { Photo } from '../../../types/photo.type';
import { buildThumbnailUrl } from '../../../utils/buildThumbnailUrl';
import * as S from './PhotoGrid.styles';

interface PhotoGridProps {
  photoList: Photo[];
}

const PhotoGrid = ({ photoList }: PhotoGridProps) => {
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
        />
      ))}
    </S.Wrapper>
  );
};

export default PhotoGrid;
