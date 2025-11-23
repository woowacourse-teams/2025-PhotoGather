import defaultImage from '../../../@assets/images/default-forgather-image.png';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { buildYoutubeThumbnail } from '../../../utils/buildYoutubeThumbnail';
import { checkIsYoutube } from '../../../utils/checkIsYoutube';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as S from './WorkCard.styles';

interface WorkCardProps {
  title: string;
  category: string;
  thumbnailUrl?: string;
  firstPhotoPath?: string;
  videoUrl?: string;
  onClick?: () => void;
}

const WorkCard = ({
  title,
  category,
  thumbnailUrl,
  firstPhotoPath,
  videoUrl,
  onClick,
}: WorkCardProps) => {
  const resolvedThumbnailUrl = (() => {
    if (thumbnailUrl) return thumbnailUrl;
    if (firstPhotoPath)
      return buildThumbnailUrl({
        path: firstPhotoPath,
        replacePath: 'product',
        preset: '800',
      });
    if (videoUrl && checkIsYoutube(videoUrl)) {
      return buildYoutubeThumbnail(videoUrl);
    }
    return '';
  })();

  return (
    <S.Wrapper onClick={onClick}>
      <S.Thumbnail
        src={resolvedThumbnailUrl || defaultImage}
        alt={title}
        onError={createImageErrorHandler(defaultImage)}
      />
      <S.InfoContainer>
        <S.Title>{title}</S.Title>
        <S.Category>{category}</S.Category>
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default WorkCard;
