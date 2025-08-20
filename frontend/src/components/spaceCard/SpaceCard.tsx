import { ReactComponent as DefaultImageIcon } from '@assets/icons/defaultImage.svg';
import { ReactComponent as GroupIcon } from '@assets/icons/group.svg';
import loadingImage from '@assets/images/loading.png';
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
  if (variant === 'expired') {
    return (
      <S.Wrapper>
        <S.ImageContainer $isBlurred>
          <S.CardImage src={profileImage} alt="여행 사진" $isBlurred />
          <S.ImageOverlayText>{`만료된\n스페이스`}</S.ImageOverlayText>
        </S.ImageContainer>
        <S.ContentContainer>
          <S.CardTitle>{name || '강릉 여행'}</S.CardTitle>
          <S.CardDuration>만료</S.CardDuration>
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

  if (variant === 'early') {
    return (
      <S.Wrapper>
        <S.ImageContainer $isEarly>
          <S.CardImage src={loadingImage} alt="로딩 이미지" $isEarly />
          <S.EarlyOverlayContainer>
            <S.EarlyOverlayTitle>{name || '강릉 여행'}</S.EarlyOverlayTitle>
            <S.EarlyOverlayDate>
              {`열리기까지 ${openedAt}` || '곧 시작'}
            </S.EarlyOverlayDate>
          </S.EarlyOverlayContainer>
        </S.ImageContainer>
      </S.Wrapper>
    );
  }

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
};

export default SpaceCard;
