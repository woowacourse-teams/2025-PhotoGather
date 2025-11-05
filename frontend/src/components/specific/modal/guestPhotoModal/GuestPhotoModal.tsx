import { useEffect, useState } from 'react';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import type { Photo } from '../../../../types/photo.type';
import { buildThumbnailUrl } from '../../../../utils/buildImageUrl';
import ImageSwiper from '../../../@common/imageSwiper/ImageSwiper';
import Modal from '../../../@common/modal/Modal';
import * as S from './GuestPhotoModal.styles';

interface PhotoModalProps {
  isOpen: boolean;
  photoList: Photo[];
  initialPhotoIndex: number;
  spaceCode: string;
  guestbookCardId: string;
  onClose: () => void;
  onDelete?: (photoId: number) => void;
}

const GuestPhotoModal = ({
  isOpen,
  photoList,
  initialPhotoIndex,
  spaceCode,
  onClose,
}: PhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);
  const { trackClick } = useButtonTracking({ userType: 'guest', spaceCode });

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialPhotoIndex);
    }
  }, [isOpen, initialPhotoIndex]);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex !== currentIndex) {
      trackClick('guest_guestbook_photo_modal_navigate', {
        direction: newIndex > currentIndex ? 'next' : 'previous',
        fromIndex: currentIndex + 1,
        toIndex: newIndex + 1,
        totalPhotoCount: photoList.length,
      });
    }
    setCurrentIndex(newIndex);
  };

  const imageInfo = photoList.map((photo) => ({
    id: photo.id,
    originFile: new File([], photo.originalName),
    previewUrl: buildThumbnailUrl({
      path: photo.path,
      replacePath: 'guestbook',
    }),
    capturedAt: null,
    capacityValue: 0,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <S.Wrapper>
        <ImageSwiper
          initialIndex={initialPhotoIndex}
          imageInfo={imageInfo}
          updateCurrentIndex={handleSlideChange}
        />
      </S.Wrapper>
    </Modal>
  );
};

export default GuestPhotoModal;
