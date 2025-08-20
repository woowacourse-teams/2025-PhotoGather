import { ReactComponent as DefaultImageIcon } from '@assets/icons/defaultImage.svg';
import { ReactComponent as GroupIcon } from '@assets/icons/group.svg';
import loadingImage from '@assets/images/loading.png';
import { profileImage } from '../../pages/logout/LogoutPage';
import {
  formatExpiredDate,
  formatRemainingHours,
  formatTimeUntilOpen,
} from '../../utils/dateTimeFormatters';
import * as S from './SpaceCard.styles';

type SpaceCardVariant = 'default' | 'expired' | 'early';

// SpaceCreateInfo 참고
interface SpaceCardProps {
  name: string;
  validHours: number;
  openedAt: string;
  expiredAt?: string;
  totalParticipants?: number;
  totalImages?: number;
  variant: SpaceCardVariant;
}

const SpaceCard = ({
  name,
  validHours,
  openedAt,
  expiredAt,
  totalParticipants,
  totalImages,
  variant,
}: SpaceCardProps) => {
  if (variant === 'expired') {
    return (
      <S.Wrapper>
        <S.ImageContainer $isBlurred>
          <S.CardImage src={profileImage} alt={name} $isBlurred />
          <S.ImageOverlayText>{`만료된\n스페이스`}</S.ImageOverlayText>
        </S.ImageContainer>
        <S.ContentContainer>
          <S.CardTitle>{name}</S.CardTitle>
          <S.CardDuration>{formatExpiredDate(expiredAt)}</S.CardDuration>
          <S.InfoContainer>
            <S.InfoItem>
              <GroupIcon />
              <S.InfoText>{totalParticipants}명</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <DefaultImageIcon />
              <S.InfoText>{totalImages}장</S.InfoText>
            </S.InfoItem>
          </S.InfoContainer>
        </S.ContentContainer>
      </S.Wrapper>
    );
  }

  if (variant === 'early') {
    return (
      <S.Wrapper>
        <S.ImageContainer $isEarly>
          <S.CardImage src={loadingImage} alt="로딩 이미지" $isEarly />
          <S.EarlyOverlayContainer>
            <S.EarlyOverlayTitle>{name}</S.EarlyOverlayTitle>
            <S.EarlyOverlayDate>
              {formatTimeUntilOpen(openedAt)}
            </S.EarlyOverlayDate>
          </S.EarlyOverlayContainer>
        </S.ImageContainer>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.ImageContainer>
        <S.CardImage src={profileImage} alt={name} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.CardTitle>{name}</S.CardTitle>
        <S.CardDuration>{formatRemainingHours(validHours)}</S.CardDuration>
        <S.InfoContainer>
          <S.InfoItem>
            <GroupIcon />
            <S.InfoText>{totalParticipants}명</S.InfoText>
          </S.InfoItem>
          <S.InfoItem>
            <DefaultImageIcon />
            <S.InfoText>{totalImages}장</S.InfoText>
          </S.InfoItem>
        </S.InfoContainer>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCard;
