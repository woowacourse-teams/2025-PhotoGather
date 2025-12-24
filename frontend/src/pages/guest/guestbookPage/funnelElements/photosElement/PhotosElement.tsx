import { useState } from 'react';
import { MdAddAPhoto, MdDeleteOutline } from 'react-icons/md';
import ImageSwiperActions from '../../../../../components/specific/imageSwiperActions/ImageSwiperActions';
import TextModal from '../../../../../components/specific/modal/textModal/TextModal';
import PhotoUploadButton from '../../../../../components/specific/photoUploadButton/PhotoUploadButton';
import { INFORMATION } from '../../../../../constants/messages';
import useButtonTracking from '../../../../../hooks/@common/useButtonTracking';
import useLocalFile from '../../../../../hooks/@common/useLocalFile';
import useSwiperActions from '../../../../../hooks/domain/image/useSwiperActions';
import * as C from '../../../../../styles/@common/PhotoInput.styles';
import { theme } from '../../../../../styles/theme';
import type { LocalFile } from '../../../../../types/file.type';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';

interface PhotosElementProps {
  receiver: string;
  onNextButtonClick: (photos: LocalFile[]) => void;
  initialLocalFiles: LocalFile[];
}

const PhotosElement = ({
  receiver,
  onNextButtonClick,
  initialLocalFiles,
}: PhotosElementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackClick } = useButtonTracking({
    userType: 'guest',
  });
  const { currentIndex, updateCurrentIndex } = useSwiperActions({
    initialIndex: 0,
  });

  const {
    localFiles,
    previewFiles,
    handleFilesUploadClick,
    handleFilesDrop,
    deleteFile,
  } = useLocalFile({
    fileType: 'image',
    initialLocalFiles: initialLocalFiles,
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    trackClick('guestbook_create_photo_upload', {
      page: '/guestbook/create/photos',
      currentPhotoCount: localFiles.length,
    });
    handleFilesUploadClick(event);
  };

  const handlePhotoDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    trackClick('guestbook_create_photo_drop', {
      page: '/guestbook/create/photos',
      currentPhotoCount: localFiles.length,
    });
    handleFilesDrop(event);
  };

  const handlePhotoDelete = () => {
    trackClick('guestbook_create_photo_delete', {
      page: '/guestbook/create/photos',
      currentPhotoCount: localFiles.length,
      deletedPhotoIndex: currentIndex + 1,
    });
    deleteFile(localFiles[currentIndex].id);
  };

  const openConfirmModal = () => {
    setIsModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmTextModal = () => {
    closeConfirmModal();
    onNextButtonClick(localFiles);
  };

  const swiperActions = [
    {
      icon: <MdDeleteOutline fill={theme.colors.error} size={24} />,
      onClick: handlePhotoDelete,
    },
    {
      icon: (
        <C.Wrapper>
          <C.Label>
            <MdAddAPhoto size={20} />
            <C.FileInput
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </C.Label>
        </C.Wrapper>
      ),
      onClick: () => {},
    },
  ];

  return (
    <>
      <TextModal
        text={INFORMATION.GUESTBOOK.MODAL.TEXT}
        description={INFORMATION.GUESTBOOK.MODAL.DESCRIPTION}
        isOpen={isModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmTextModal}
      />
      <FunnelBasePage
        isOptional
        prompt={INFORMATION.GUESTBOOK.PHOTOS.PROMPT}
        receiver={receiver}
        element={
          previewFiles.length === 0 ? (
            <PhotoUploadButton
              mainText={INFORMATION.GUESTBOOK.PHOTOS.PROMPT}
              onChange={handlePhotoUpload}
              onDrop={handlePhotoDrop}
              disabled={false}
            />
          ) : (
            <ImageSwiperActions
              imageInfo={previewFiles}
              initialIndex={0}
              updateCurrentIndex={updateCurrentIndex}
              actions={swiperActions}
              spaceBetween={-30}
            />
          )
        }
        buttonText="전송"
        onNextButtonClick={openConfirmModal}
      />
    </>
  );
};

export default PhotosElement;
