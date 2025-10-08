import { useId } from 'react';
import { IoCamera } from 'react-icons/io5';
import defaultImage from '../../../@assets/images/default-image.png';
import { Thumbnail } from '../../../pages/MainPage.common.styles';
import type { PreviewFile } from '../../../types/file.type';
import * as S from './PhotoUploadButton.styles';

interface PhotoUploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewFile: PreviewFile[];
  originalSrc?: string;
}

const PhotoUploadButton = ({
  uploadImage,
  originalSrc,
  previewFile,
}: PhotoUploadButtonProps) => {
  const fileInputId = useId();

  const matchThumbnailImage = () =>
    previewFile[0]?.previewUrl || originalSrc || defaultImage;

  return (
    <>
      <S.Label htmlFor={fileInputId}>
        <Thumbnail src={matchThumbnailImage()} />
        <S.Overlay>
          <IoCamera />
        </S.Overlay>
      </S.Label>
      <S.FileInput
        id={fileInputId}
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
    </>
  );
};

/**
 * 
 * <label for="fileInput" class="custom-upload">
  <img src="/camera-icon.svg" alt="" />
</label>
<input type="file" id="fileInput" style="display:none" />
 */
export default PhotoUploadButton;
