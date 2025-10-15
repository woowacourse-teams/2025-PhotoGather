import { MdAddAPhoto, MdDeleteOutline } from 'react-icons/md';
import ImageSwiperActions from '../../../../../components/specific/imageSwiperActions/ImageSwiperActions';
import PhotoUploadButton from '../../../../../components/specific/photoUploadButton/PhotoUploadButton';
import { INFORMATION } from '../../../../../constants/messages';
import useSwiperActions from '../../../../../hooks/domain/image/useSwiperActions';
import * as C from '../../../../../styles/@common/PhotoInput.styles';
import { theme } from '../../../../../styles/theme';
import type { LocalFile } from '../../../../../types/file.type';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';

interface PhotosElementProps {
  receiver: string;
  onNextButtonClick: (photos: LocalFile[]) => void;
  localFiles: LocalFile[];
  deleteFile: (id: number) => void;
  handleFilesUploadClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilesDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
}

const PhotosElement = ({
  receiver,
  onNextButtonClick,
  localFiles,
  deleteFile,
  handleFilesUploadClick,
  handleFilesDrop,
}: PhotosElementProps) => {
  const { currentIndex, updateCurrentIndex } = useSwiperActions({
    initialIndex: 0,
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
        localFiles.length === 0 ? (
          <PhotoUploadButton
            mainText={INFORMATION.GUESTBOOK.PHOTOS.PROMPT}
            onChange={handleFilesUploadClick}
            onDrop={handleFilesDrop}
            disabled={false}
          />
        ) : (
          <ImageSwiperActions
            imageInfo={localFiles}
            initialIndex={0}
            updateCurrentIndex={updateCurrentIndex}
            actions={swiperActions}
          />
        )
      }
      buttonText="전송"
      onNextButtonClick={() => onNextButtonClick(localFiles)}
    />
  );
};

export default PhotosElement;
