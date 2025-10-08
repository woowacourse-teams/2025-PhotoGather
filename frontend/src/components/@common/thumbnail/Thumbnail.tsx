import * as S from './Thumbnail.styles';

interface ThumbnailProps {
  src: string;
  alt?: string;
}

const Thumbnail = ({ src, alt = '' }: ThumbnailProps) => {
  return <S.Thumbnail src={src} alt={alt} />;
};

export default Thumbnail;
