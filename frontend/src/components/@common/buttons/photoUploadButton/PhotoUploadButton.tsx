import { useRef } from 'react';
import defaultImage from '../../../../@assets/images/default-image.png';
import { Thumbnail } from '../../../../pages/host/mainPage/HostMainPage.styles';
import * as S from './PhotoUploadButton.styles';

interface PhotoUploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  originalSrc?: string;
}

const PhotoUploadButton = ({ originalSrc }: PhotoUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <S.Wrapper onClick={handleClick}>
      <S.ThumbnailContainer>
        {/**공통 컴포넌트로 대체 예정 */}
        <Thumbnail src={originalSrc ? originalSrc : defaultImage} />
      </S.ThumbnailContainer>
      <S.FileInput type="file" accept="image/*" ref={inputRef} />
    </S.Wrapper>
  );
};

export default PhotoUploadButton;
