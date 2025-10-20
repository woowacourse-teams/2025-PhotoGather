import PhotoGrid from '../../../../../components/specific/photoGrid/PhotoGrid';
import type { Photo } from '../../../../../types/photo.type';
import * as S from '../GuestGuestbookCardPage.styles';

interface GuestbookCardPhotoSectionProps {
  photoList: Photo[];
  onPhotoClick?: (photo: Photo) => void;
  isGuestbookCardFetching?: boolean;
}

const GuestGuestbookCardPhotoSection = ({
  photoList,
  onPhotoClick,
  isGuestbookCardFetching = false,
}: GuestbookCardPhotoSectionProps) => {
  return (
    <S.PhotoSection>
      {isGuestbookCardFetching ? (
        <div style={{ width: '100%', height: '250px' }} />
      ) : (
        photoList.length > 0 && (
          <PhotoGrid photoList={photoList} onPhotoClick={onPhotoClick} />
        )
      )}
    </S.PhotoSection>
  );
};

export default GuestGuestbookCardPhotoSection;
