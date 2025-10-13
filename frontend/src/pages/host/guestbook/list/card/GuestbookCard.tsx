import { MdArrowForward, MdOutlinePhoto } from 'react-icons/md';
import { theme } from '../../../../../styles/theme';
import * as S from './GuestbookCard.styles';

interface GuestbookCardProps {
  guestName: string;
  hasPhoto: boolean;
  isNew: boolean;
}

const GuestbookCard = ({ guestName, hasPhoto, isNew }: GuestbookCardProps) => {
  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.Text>From. {guestName}</S.Text>
        <S.IconContainer>
          {hasPhoto && <MdOutlinePhoto color={theme.colors.gray03} />}
          {isNew && <S.Circle />}
        </S.IconContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <MdArrowForward size={24} />
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default GuestbookCard;
