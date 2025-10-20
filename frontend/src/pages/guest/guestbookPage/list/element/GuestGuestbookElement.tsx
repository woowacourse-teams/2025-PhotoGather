import { MdArrowForward, MdOutlinePhoto } from 'react-icons/md';
import { theme } from '../../../../../styles/theme';
import * as S from './GuestGuestbookElement.styles';

interface GuestbookElementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  guestName: string;
  hasPhoto: boolean;
  isRead: boolean;
}

const GuestGuestbookElement = ({
  guestName,
  hasPhoto,
  isRead,
  ...buttonProps
}: GuestbookElementProps) => {
  return (
    <S.Wrapper {...buttonProps}>
      <S.LeftContainer>
        <S.Text>From. {guestName}</S.Text>
        <S.IconContainer>
          {hasPhoto && <MdOutlinePhoto color={theme.colors.gray03} size={20} />}
          {isRead === false && <S.Circle />}
        </S.IconContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <MdArrowForward size={24} />
      </S.RightContainer>
    </S.Wrapper>
  );
};

export default GuestGuestbookElement;
