import { MdOutlinePhoto } from 'react-icons/md';
import * as C from '../../../../../styles/@common/SkeletonBox.styles';
import type { GuestbookCard } from '../../../../../types/domain/guestbook.type';
import * as S from '../GuestGuestbookCardPage.styles';

interface GuestbookCardInfoSectionProps {
  guestbookCard: GuestbookCard;
  createdTimeDescription: string;
  photoListLength: number;
  isGuestbookCardFetching?: boolean;
}

const GuestbookCardInfoSection = ({
  guestbookCard,
  createdTimeDescription,
  photoListLength,
  isGuestbookCardFetching = false,
}: GuestbookCardInfoSectionProps) => {
  return (
    <S.InfoSection>
      {isGuestbookCardFetching ? (
        <>
          <C.SkeletonBox $width="50%" $height="1.5rem" />
          <C.SkeletonBox $width="70%" $height="1.5rem" />
          <C.SkeletonBox $width="10%" $height="1.5rem" />
        </>
      ) : (
        <>
          <S.InfoTitle>"{guestbookCard.nickname}"의 방명록</S.InfoTitle>
          <S.InfoDescription>{createdTimeDescription}</S.InfoDescription>
          <S.IconInfoContainer>
            {photoListLength > 0 && (
              <>
                <MdOutlinePhoto />
                <p>{photoListLength}</p>
              </>
            )}
          </S.IconInfoContainer>
        </>
      )}
    </S.InfoSection>
  );
};

export default GuestbookCardInfoSection;
