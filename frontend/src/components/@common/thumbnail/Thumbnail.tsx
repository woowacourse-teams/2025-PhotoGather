import defaultThumbnail from '../../../@assets/images/default-forgather-image.png';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as S from './Thumbnail.styles';

interface ThumbnailProps {
  src: string;
  alt?: string;
  onClick?: () => void;
}

const Thumbnail = ({ src, alt = '', onClick }: ThumbnailProps) => {
  return (
    <S.Thumbnail
      src={src ? src : defaultThumbnail}
      alt={alt}
      onError={createImageErrorHandler(defaultThumbnail)}
      onClick={onClick}
    />
  );
};

export default Thumbnail;
