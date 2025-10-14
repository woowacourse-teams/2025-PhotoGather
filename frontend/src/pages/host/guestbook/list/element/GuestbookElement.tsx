import { MdArrowForward, MdOutlinePhoto } from 'react-icons/md';
import { theme } from '../../../../../styles/theme';
import * as S from './GuestbookElement.styles';

interface GuestbookElementProps {
  guestName: string;
  hasPhoto: boolean;
  isRead: boolean;
}

const GuestbookElement = ({
  guestName,
  hasPhoto,
  isRead,
}: GuestbookElementProps) => {
  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.Text>From. {guestName}</S.Text>
        <S.IconContainer>
          {hasPhoto && <MdOutlinePhoto color={theme.colors.gray03} />}
          {!isRead && <S.Circle />}
        </S.IconContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <MdArrowForward size={24} />
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default GuestbookElement;
