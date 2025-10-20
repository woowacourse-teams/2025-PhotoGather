import { useEffect, useState } from 'react';
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
  onClose,
}: PhotoModalProps) => {
  const [_currentIndex, setCurrentIndex] = useState(initialPhotoIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialPhotoIndex);
    }
  }, [isOpen, initialPhotoIndex]);

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
          updateCurrentIndex={setCurrentIndex}
        />
      </S.Wrapper>
    </Modal>
  );
};

export default GuestPhotoModal;
