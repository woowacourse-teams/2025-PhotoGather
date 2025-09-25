import { DefaultImageIcon, GroupIcon } from '../../../@assets/icons';
import {
  DefaultImageImg as defaultImage,
  LoadingImg as loadingImage,
} from '../../../@assets/images';
import { theme } from '../../../styles/theme';
import type { MySpace } from '../../../types/space.type';
import { formatExpiredDate } from '../../../utils/dateTimeFormatters';
import { formatDate } from '../../../utils/formatDate';
import AccessTypeIcon from '../../@common/accessTypeIcon/AccessTypeIcon';
import HighlightText from '../../@common/highlightText/HighlightText';
import * as S from './SpaceCard.styles';

type SpaceCardVariant = 'default' | 'expired' | 'early';

interface SpaceCardProps {
  /** 표시할 스페이스 정보 */
  space: MySpace;
  /** 썸네일 */
  thumbnail?: string;
  /** 카드 타입 */
  variant: SpaceCardVariant;
  /** 카드 클릭 시 실행할 함수 */
  onClick: () => void;
}

const SpaceCard = ({ space, thumbnail, variant, onClick }: SpaceCardProps) => {
  const { name, expiredAt, guestCount, photoCount, openedAt, type } = space;

  if (variant === 'expired') {
    return (
      <S.Wrapper onClick={onClick}>
        <S.ImageContainer $isBlurred>
          <S.CardImage src={defaultImage} alt={name} $isBlurred />
          <S.ImageOverlayText>{`만료된\n스페이스`}</S.ImageOverlayText>
        </S.ImageContainer>
        <S.ContentContainer>
          <S.CardTitle>{name}</S.CardTitle>
          <S.CardDuration>{formatExpiredDate(expiredAt ?? '')}</S.CardDuration>
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
      <S.Wrapper onClick={onClick}>
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
    <S.Wrapper onClick={onClick}>
      <S.ImageContainer>
        <S.CardImage src={thumbnail ?? defaultImage} alt={name} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.CardTitleContainer>
          <S.CardTitle>{name}</S.CardTitle>
          <AccessTypeIcon
            accessType={type ?? 'PRIVATE'}
            color={theme.colors.gray06}
          />
        </S.CardTitleContainer>
        <S.CardDuration>{formatExpiredDate(expiredAt ?? '')}</S.CardDuration>
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
