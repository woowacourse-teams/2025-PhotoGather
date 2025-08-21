import { ReactComponent as DefaultImageIcon } from '@assets/icons/defaultImage.svg';
import { ReactComponent as GroupIcon } from '@assets/icons/group.svg';
import loadingImage from '@assets/images/loading.png';
import { useNavigate } from 'react-router-dom';
import { profileImage } from '../../pages/logout/LogoutPage';
import { formatExpiredDate } from '../../utils/dateTimeFormatters';
import { formatDate } from '../../utils/formatDate';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './SpaceCard.styles';

type SpaceCardVariant = 'default' | 'expired' | 'early';

interface SpaceCardProps {
  /** 스페이스 이름 */
  name: string;
  /** 스페이스 오픈 시간 */
  openedAt?: string;
  /** 스페이스 만료 시간 */
  expiredAt?: string;
  /** 참여자 수 */
  guestCount?: number;
  /** 이미지 수 */
  photoCount?: number;
  /** 카드 타입 */
  variant: SpaceCardVariant;
  /** 카드 클릭 시 이동할 경로 */
  route: string;
}

const SpaceCard = ({
  name,
  openedAt,
  expiredAt,
  guestCount = 0,
  photoCount = 0,
  variant,
  route,
}: SpaceCardProps) => {
  const navigate = useNavigate();

  if (variant === 'expired') {
    return (
      <S.Wrapper onClick={() => navigate(route)}>
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
      <S.Wrapper onClick={() => navigate(route)}>
        <S.ImageContainer $isEarly>
          <S.CardImage src={loadingImage} alt="로딩 이미지" $isEarly />
          <S.EarlyOverlayContainer>
            <S.EarlyOverlayTitle>{name}</S.EarlyOverlayTitle>
            <HighlightText
              text={`${openedAt ? `${formatDate(openedAt).date} ${formatDate(openedAt).time}` : ''}\n오픈 예정`}
              highlightTextArray={[
                openedAt
                  ? `${formatDate(openedAt).date} ${formatDate(openedAt).time}`
                  : '',
              ]}
              highlightColorStyle="accent"
              textColorStyle="white"
              fontStyle="bodyLarge"
            />
          </S.EarlyOverlayContainer>
        </S.ImageContainer>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper onClick={() => navigate(route)}>
      <S.ImageContainer>
        <S.CardImage src={profileImage} alt={name} />
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
};

export default SpaceCard;
