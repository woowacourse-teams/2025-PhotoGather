import Button from '../../../../../components/@common/buttons/button/Button';
import PhotoGrid from '../../../../../components/specific/photoGrid/PhotoGrid';
import type { Photo } from '../../../../../types/photo.type';
import * as S from '../GuestbookCardPage.styles';

interface GuestbookCardPhotoSectionProps {
  photoList: Photo[];
  onPhotoClick?: (photo: Photo) => void;
  isGuestbookCardFetching?: boolean;
}

const GuestbookCardPhotoSection = ({
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
          <>
            <PhotoGrid photoList={photoList} onPhotoClick={onPhotoClick} />
            <Button
              type="button"
              variant="secondary"
              text="사진 전체 다운로드"
              style={{ border: 'none' }}
            />
          </>
        )
      )}
    </S.PhotoSection>
  );
};

export default GuestbookCardPhotoSection;
