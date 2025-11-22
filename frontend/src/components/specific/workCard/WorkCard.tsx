import defaultImage from '../../../@assets/images/default-forgather-image.png';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as S from './WorkCard.styles';

interface WorkCardProps {
  thumbnailUrl?: string;
  title: string;
  category: string;
  onClick?: () => void;
}

const WorkCard = ({
  thumbnailUrl,
  title,
  category,
  onClick,
}: WorkCardProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      <S.Thumbnail
        src={thumbnailUrl || defaultImage}
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
