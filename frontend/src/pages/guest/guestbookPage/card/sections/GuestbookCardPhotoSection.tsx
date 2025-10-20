import Button from '../../../../../components/@common/buttons/button/Button';
import PhotoGrid from '../../../../../components/specific/photoGrid/PhotoGrid';
import { useToast } from '../../../../../hooks/@common/useToast';
import useDownloadAsZip from '../../../../../hooks/domain/image/useDownloadAsZip';
import type { Photo } from '../../../../../types/photo.type';
import { buildOriginalImageUrl } from '../../../../../utils/buildImageUrl';
import * as S from '../GuestbookCardPage.styles';

interface GuestbookCardPhotoSectionProps {
  photoList: Photo[];
  onPhotoClick?: (photo: Photo) => void;
  isGuestbookCardFetching?: boolean;
  guestbookTitle?: string;
}

const GuestbookCardPhotoSection = ({
  photoList,
  onPhotoClick,
  isGuestbookCardFetching = false,
  guestbookTitle = '방명록 사진',
}: GuestbookCardPhotoSectionProps) => {
  const { showToast } = useToast();
  const { downloadAsZip, isLoading } = useDownloadAsZip();

  const handleDownload = async () => {
    const photoDownloadInfo = photoList.map(({ originalName, path }) => ({
      originalName,
      path: buildOriginalImageUrl(path),
    }));
    try {
      await downloadAsZip(photoDownloadInfo, guestbookTitle);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '방명록 사진 다운로드 중 오류가 발생했습니다.';
      showToast({
        text: errorMessage,
        type: 'error',
      });
    }
  };

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
              text={isLoading ? '다운로드 중..' : '사진 전체 다운로드'}
              style={{ border: 'none' }}
              onClick={handleDownload}
              disabled={isLoading}
            />
          </>
        )
      )}
    </S.PhotoSection>
  );
};

export default GuestbookCardPhotoSection;
