import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdDeleteOutline, MdDownload } from 'react-icons/md';
import { guestbookService } from '../../../../apis/services/guestbook/guestbook.service';
import { useToast } from '../../../../hooks/@common/useToast';
import { theme } from '../../../../styles/theme';
import type { Photo } from '../../../../types/photo.type';
import { buildThumbnailUrl } from '../../../../utils/buildThumbnailUrl';
import { downloadByAnchor, saveImage } from '../../../../utils/saveImage';
import Modal from '../../../@common/modal/Modal';
import ImageSwiperActions from '../../imageSwiperActions/ImageSwiperActions';
import * as S from './PhotoModal.style';

interface PhotoModalProps {
  isOpen: boolean;
  photoList: Photo[];
  initialPhotoIndex: number;
  spaceCode: string;
  guestbookCardId: string;
  onClose: () => void;
  onDelete?: (photoId: number) => void;
}

const PhotoModal = ({
  isOpen,
  photoList,
  initialPhotoIndex,
  spaceCode,
  guestbookCardId,
  onClose,
  onDelete,
}: PhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // TODO: 타입 수정 필요
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

  const deleteMutation = useMutation({
    mutationFn: async (photoId: number) => {
      const response = await guestbookService.deleteGuestbookCardPhotos(
        spaceCode,
        Number(guestbookCardId),
        [photoId],
      );

      if (!response.success) {
        throw new Error('사진 삭제에 실패했습니다.');
      }

      return { photoId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['guestbook', spaceCode] });
      showToast({ text: '사진이 삭제되었습니다.', type: 'info' });
      onDelete?.(data.photoId);
    },
    onError: (error) => {
      console.error('Failed to delete photo:', error);
      showToast({ text: '사진 삭제에 실패했습니다.', type: 'error' });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (photo: Photo) => {
      const response = await fetch(photo.path);
      const blob = await response.blob();

      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );

      if (isMobile) {
        await saveImage(blob, photo.originalName);
      } else {
        await downloadByAnchor(blob, photo.originalName);
      }
    },
    onSuccess: () => {
      showToast({ text: '사진이 다운로드되었습니다.', type: 'info' });
    },
    onError: (error) => {
      console.error('Failed to download photo:', error);
      showToast({ text: '사진 다운로드에 실패했습니다.', type: 'error' });
    },
  });

  const handleDelete = () => {
    const photo = photoList[currentIndex];
    if (!photo) return;

    deleteMutation.mutate(photo.id);
  };

  const handleDownload = () => {
    const photo = photoList[currentIndex];
    if (!photo) return;

    downloadMutation.mutate(photo);
  };

  const actions = [
    {
      icon: <MdDeleteOutline fill={theme.colors.error} size={24} />,
      onClick: handleDelete,
    },
    {
      icon: <MdDownload size={24} />,
      onClick: handleDownload,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <S.Wrapper>
        <ImageSwiperActions
          initialIndex={initialPhotoIndex}
          imageInfo={imageInfo}
          updateCurrentIndex={setCurrentIndex}
          actions={actions}
          size="large"
        />
      </S.Wrapper>
    </Modal>
  );
};

export default PhotoModal;
