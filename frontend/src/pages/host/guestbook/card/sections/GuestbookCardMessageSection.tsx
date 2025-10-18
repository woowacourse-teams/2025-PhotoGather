import type { GuestbookCard } from '../../../../../types/domain/guestbook.type';
import * as S from '../GuestbookCardPage.styles';

interface GuestbookCardMessageSectionProps {
  guestbookCard: GuestbookCard;
  isGuestbookCardFetching?: boolean;
}

const GuestbookCardMessageSection = ({
  guestbookCard,
  isGuestbookCardFetching = false,
}: GuestbookCardMessageSectionProps) => {
  return (
    <S.MessageSection>
      {isGuestbookCardFetching ? (
        <div style={{ width: '100%', height: '1.5rem' }} />
      ) : (
        <S.Message>{guestbookCard.message}</S.Message>
      )}
    </S.MessageSection>
  );
};

export default GuestbookCardMessageSection;
