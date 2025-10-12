import { useId, useRef } from 'react';
import { IoCamera, IoClose } from 'react-icons/io5';
import defaultImage from '../../../@assets/images/default-image.png';
import { Thumbnail } from '../../../pages/MainPage.common.styles';
import type { PreviewFile } from '../../../types/file.type';
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

  const originalImagePath = `${import.meta.env.VITE_IMAGE_BASE_URL}${originalSrc}`;

  const matchThumbnailImage = () =>
    previewFile[0]?.previewUrl || originalImagePath || defaultImage;

  const isPhotoExist = !!previewFile[0]?.previewUrl || !!originalSrc;

  const deletePhoto = () => {
    if (originalSrc) {
      deleteImage();
    }
    // TODO : 성공시 아래 로직 실행
    clearFiles();
  };

  return (
    <S.Wrapper>
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
      <S.Label
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
      </S.Label>
      <S.FileInput
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
    </S.Wrapper>
  );
};

export default PhotoPreviewButton;
