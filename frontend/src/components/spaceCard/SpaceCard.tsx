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

interface SpaceCardProps {
  /** 스페이스 이름 */
  name: string;
  /** 남은 유효 시간 (시간 단위)*/
  validHours: number;
  /** 스페이스 오픈 시간 */
  openedAt: string;
  /** 스페이스 만료 시간 */
  expiredAt?: string;
  /** 참여자 수 */
  guestCount?: number;
  /** 이미지 수 */
  photoCount?: number;
  /** 카드 타입 */
  variant: SpaceCardVariant;
}

const SpaceCard = ({
  name,
  validHours,
  openedAt,
  expiredAt,
  guestCount = 0,
  photoCount = 0,
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
              <S.InfoText>{guestCount}명</S.InfoText>
            </S.InfoItem>
            <S.InfoItem>
              <DefaultImageIcon />
              <S.InfoText>{photoCount}장</S.InfoText>
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
            <S.InfoText>{guestCount}명</S.InfoText>
          </S.InfoItem>
          <S.InfoItem>
            <DefaultImageIcon />
            <S.InfoText>{photoCount}장</S.InfoText>
          </S.InfoItem>
        </S.InfoContainer>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCard;
