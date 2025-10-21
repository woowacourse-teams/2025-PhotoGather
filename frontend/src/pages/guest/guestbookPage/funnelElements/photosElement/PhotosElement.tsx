import { MdAddAPhoto, MdDeleteOutline } from 'react-icons/md';
import ImageSwiperActions from '../../../../../components/specific/imageSwiperActions/ImageSwiperActions';
import PhotoUploadButton from '../../../../../components/specific/photoUploadButton/PhotoUploadButton';
import { INFORMATION } from '../../../../../constants/messages';
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

  const swiperActions = [
    {
      icon: <MdDeleteOutline fill={theme.colors.error} size={24} />,
      onClick: () => {
        deleteFile(localFiles[currentIndex].id);
      },
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
              onChange={handleFilesUploadClick}
            />
          </C.Label>
        </C.Wrapper>
      ),
      onClick: () => {},
    },
  ];

  return (
    <FunnelBasePage
      isOptional
      prompt={INFORMATION.GUESTBOOK.PHOTOS.PROMPT}
      receiver={receiver}
      element={
        previewFiles.length === 0 ? (
          <PhotoUploadButton
            mainText={INFORMATION.GUESTBOOK.PHOTOS.PROMPT}
            onChange={handleFilesUploadClick}
            onDrop={handleFilesDrop}
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
      onNextButtonClick={() => onNextButtonClick(localFiles)}
    />
  );
};

export default PhotosElement;
