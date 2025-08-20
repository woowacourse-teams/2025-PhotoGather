import { ReactComponent as DefaultImageIcon } from '@assets/icons/defaultImage.svg';
import { ReactComponent as GroupIcon } from '@assets/icons/group.svg';
import { profileImage } from '../../pages/logout/LogoutPage';
import * as S from './SpaceCard.styles';

type SpaceCardVariant = 'default' | 'expired' | 'early';

interface SpaceCardProps {
  // SpaceCreateInfo
  name: string;
  validHours: number;
  openedAt: string;
  totalParticipants?: number;
  totalImages?: number;
  variant: SpaceCardVariant;
}

const SpaceCard = ({
  name,
  validHours,
  openedAt,
  totalParticipants,
  totalImages,
  variant,
}: SpaceCardProps) => {
  if (variant === 'default') {
    return (
      <S.Wrapper>
        <S.ImageContainer>
          <S.CardImage src={profileImage} alt="여행 사진" />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.CardTitle>{name || '강릉 여행'}</S.CardTitle>
          <S.CardDuration>{validHours || '12:27:33 남음'}</S.CardDuration>
          <S.InfoContainer>
            <S.InfoItem>
              <GroupIcon />
              <S.InfoText>{totalParticipants || 12}명</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <DefaultImageIcon />
              <S.InfoText>{totalImages || 67}장</S.InfoText>
            </S.InfoItem>
          </S.InfoContainer>
        </S.ContentContainer>
      </S.Wrapper>
    );
  }
};

export default SpaceCard;
