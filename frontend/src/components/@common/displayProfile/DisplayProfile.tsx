import LogoButtonImage from '../../../@assets/logo/logo-button.svg';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as S from './DisplayProfile.styles';

interface DisplayProfileProps {
  src: string;
  alt: string;
}

const DisplayProfile = ({ src, alt }: DisplayProfileProps) => {
  return (
    <S.DisplayImage
      src={src}
      alt={alt}
      onError={createImageErrorHandler(LogoButtonImage)}
    />
  );
};

export default DisplayProfile;
