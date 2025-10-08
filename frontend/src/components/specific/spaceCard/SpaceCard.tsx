import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5';
import { MdCelebration } from 'react-icons/md';
import type { MySpace } from '../../../types/space.type';
import * as S from './SpaceCard.styles';

interface SpaceCardProps {
  space: MySpace;
  onClick?: () => void;
}

const SpaceCard = ({ space, onClick }: SpaceCardProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      <S.SpaceThumbnail src={space.thumbnail} alt={space.title} />
      <S.SpaceInfoContainer>
        <S.SpaceHeaderContainer>
          <S.SpaceTitle>{space.title}</S.SpaceTitle>
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
          방명록 {space.guestCount}개
        </S.SpaceGuestCountContainer>
      </S.SpaceInfoContainer>
    </S.Wrapper>
  );
};

export default SpaceCard;
