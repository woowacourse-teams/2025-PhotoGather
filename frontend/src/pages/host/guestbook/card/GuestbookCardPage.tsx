import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlinePhoto,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import IconButton from '../../../../components/@common/buttons/iconButton/IconButton';
import Line from '../../../../components/@common/line/Line';
import PhotoGrid from '../../../../components/specific/photoGrid/PhotoGrid';
import { createGuestbookCardRoute } from '../../../../constants/routes';
import useGuestbookCard from '../../../../hooks/domain/guestbook/useGuestbookCard';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import { theme } from '../../../../styles/theme';
import { calculatePrevNextId } from '../../../../utils/calculatePrevNextIndex';
import { parseTimestamp } from '../../../../utils/parseTimestamp';
import * as S from './GuestbookCardPage.styles';

const GuestbookCardPage = () => {
  const navigate = useNavigate();
  const { spaceCode = '', guestbookCardId = '' } = useParams();
  const { guestbookCard } = useGuestbookCard({ spaceCode, guestbookCardId });
  const { guestbookList } = useGuestbookList({ spaceCode });
  const guestbookCardIdList = guestbookList.guestBookCards.map(
    (guestbookCard) => guestbookCard.id,
  );
  const { prevId: prevGuestbookId, nextId: nextGuestbookId } =
    calculatePrevNextId(guestbookCardIdList, guestbookCard.id);
  const { year, month, day, hour, minute } = parseTimestamp(
    guestbookCard.createdAt,
  );
  const createdTimeDescription = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  const photoListLength = guestbookCard.photos.length;

  const handlePreviousCardMove = () => {
    if (prevGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const handleNextCardMove = () => {
    if (nextGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, nextGuestbookId));
  };

  return (
    <S.Wrapper>
      <S.DeleteButtonContainer>
        <Button type="button" variant="error" text="삭제" />
      </S.DeleteButtonContainer>
      <S.InfoSection>
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
      </S.InfoSection>
      <Line
        leftElement={
          prevGuestbookId && (
            <IconButton
              onClick={handlePreviousCardMove}
              icon={<MdArrowBackIosNew color={theme.colors.gray04} />}
              variant="default"
            />
          )
        }
        rightElement={
          nextGuestbookId && (
            <IconButton
              onClick={handleNextCardMove}
              icon={<MdArrowForwardIos color={theme.colors.gray04} />}
              variant="default"
            />
          )
        }
      />
      <S.MessageSection>
        <S.Message>{guestbookCard.message}</S.Message>
      </S.MessageSection>
      {photoListLength > 0 && (
        <S.PhotoSection>
          <PhotoGrid photoList={guestbookCard.photos} />
          <Button
            type="button"
            variant="secondary"
            text="사진 전체 다운로드"
            style={{ border: 'none' }}
          />
        </S.PhotoSection>
      )}
      <Line width={192} />
    </S.Wrapper>
  );
};

export default GuestbookCardPage;
