import { useId, useRef } from 'react';
import { IoCamera, IoClose } from 'react-icons/io5';
import defaultImage from '../../../@assets/images/default-forgather-image.png';
import { Thumbnail } from '../../../pages/MainPage.common.styles';
import * as C from '../../../styles/@common/PhotoInput.styles';
import type { PreviewFile } from '../../../types/file.type';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import { handleKeyboardClick } from '../../../utils/keyboard';
import * as S from './PhotoPreviewButton.styles';

interface PhotoPreviewButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage: () => void;
  clearFiles: () => void;
  previewFile: PreviewFile[];
  originalSrc?: string;
}

const PhotoPreviewButton = ({
  uploadImage,
  deleteImage,
  originalSrc,
  previewFile,
  clearFiles,
}: PhotoPreviewButtonProps) => {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalImagePath = buildOriginalImageUrl(originalSrc || '');

  const matchThumbnailImage = () =>
    previewFile[0]?.previewUrl || originalImagePath || defaultImage;

  const isPhotoExist = !!previewFile[0]?.previewUrl || !!originalSrc;

  const deletePhoto = () => {
    clearFiles();
    if (originalSrc) {
      deleteImage();
    }
  };

  return (
    <C.Wrapper>
      {isPhotoExist && (
        <S.OverlayButton
          $position="top"
          role="button"
          tabIndex={0}
          aria-label="사진 삭제"
          onKeyDown={handleKeyboardClick}
          onClick={deletePhoto}
        >
          <IoClose />
        </S.OverlayButton>
      )}
      <C.Label
        htmlFor={fileInputId}
        tabIndex={0}
        onKeyDown={handleKeyboardClick}
      >
        <S.Overlay $isPhotoExist={isPhotoExist}>
          <IoCamera />
        </S.Overlay>
        <Thumbnail
          src={matchThumbnailImage()}
          onError={createImageErrorHandler(defaultImage)}
        />
      </C.Label>
      <C.FileInput
        id={fileInputId}
        type="file"
        accept="image/*"
        onChange={(e) => {
          uploadImage(e);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
        ref={fileInputRef}
      />
    </C.Wrapper>
  );
};

export default PhotoPreviewButton;
