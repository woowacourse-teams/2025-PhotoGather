import type { Photo } from '../../../types/photo.type';
import * as S from './PhotoGrid.styles';

interface PhotoGridProps {
  photoList: Photo[];
}

const PhotoGrid = ({ photoList }: PhotoGridProps) => {
  return (
    <S.Wrapper>
      {photoList.map((photo) => (
        <S.Image key={photo.id} src={photo.path} alt="" />
      ))}
    </S.Wrapper>
  );
};

export default PhotoGrid;
