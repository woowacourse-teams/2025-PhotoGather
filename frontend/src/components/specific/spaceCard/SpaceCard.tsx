import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5';
import { MdCelebration } from 'react-icons/md';
import defaultImage from '../../../@assets/images/default-forgather-image.png';
import type { MySpace } from '../../../types/domain/space.type';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as S from './SpaceCard.styles';

interface SpaceCardProps {
  space: MySpace;
  onClick?: () => void;
}

const SpaceCard = ({ space, onClick }: SpaceCardProps) => {
  const thumbnailUrl = space.spacePhoto.isExists
    ? buildOriginalImageUrl(space.spacePhoto.path)
    : 'invalid-url';

  return (
    <S.Wrapper onClick={onClick}>
      <S.SpaceThumbnail
        src={thumbnailUrl}
        alt={space.name}
        onError={createImageErrorHandler(defaultImage)}
      />
      <S.SpaceInfoContainer>
        <S.SpaceHeaderContainer>
          <S.SpaceTitle>{space.name}</S.SpaceTitle>
          <S.PublicIcon>
            {space.isPublic ? (
              <IoGlobeOutline size={16} />
            ) : (
              <IoLockClosedOutline size={16} />
            )}
          </S.PublicIcon>
        </S.SpaceHeaderContainer>
        <S.SpaceGuestCountContainer>
          <MdCelebration size={14} />
          방명록 {space.guestBookCardCount}개
        </S.SpaceGuestCountContainer>
      </S.SpaceInfoContainer>
    </S.Wrapper>
  );
};

export default SpaceCard;
