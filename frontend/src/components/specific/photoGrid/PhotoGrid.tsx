import type { Photo } from '../../../types/photo.type';
import * as S from './PhotoGrid.styles';

interface PhotoGridProps {
  photoList: Photo[];
}

const PhotoGrid = ({ photoList }: PhotoGridProps) => {
  return (
    <S.Wrapper>
      {photoList.map((photo, index) => (
        <S.Image key={photo.id} src={photo.path} alt={`photo-grid-${index}`} />
      ))}
    </S.Wrapper>
  );
};

export default PhotoGrid;
