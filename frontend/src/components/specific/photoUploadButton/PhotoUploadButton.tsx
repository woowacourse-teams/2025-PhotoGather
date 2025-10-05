import { useId } from 'react';
import { IoCamera } from 'react-icons/io5';
import defaultImage from '../../../@assets/images/default-image.png';
import useLocalFile from '../../../hooks/domain/useLocaleFile';
import { Thumbnail } from '../../../pages/host/mainPage/HostMainPage.styles';
import * as S from './PhotoUploadButton.styles';

interface PhotoUploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  originalSrc?: string;
}

const PhotoUploadButton = ({ originalSrc }: PhotoUploadButtonProps) => {
  const { handleFilesUploadClick } = useLocalFile({
    fileType: 'image',
    maxFileCount: 1,
  });
  const fileInputId = useId();

  return (
    <>
      <S.Label htmlFor={fileInputId}>
        <Thumbnail src={originalSrc ? originalSrc : defaultImage} />
        <S.Overlay>
          <IoCamera />
        </S.Overlay>
      </S.Label>
      <S.FileInput
        id={fileInputId}
        type="file"
        accept="image/*"
        onChange={handleFilesUploadClick}
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
