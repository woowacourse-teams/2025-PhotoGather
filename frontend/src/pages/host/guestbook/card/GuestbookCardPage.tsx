import { Activity, useEffect, useState } from 'react';
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlinePhoto,
  MdSwipe,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import IconButton from '../../../../components/@common/buttons/iconButton/IconButton';
import Line from '../../../../components/@common/line/Line';
import OnBoardingModal from '../../../../components/specific/modal/onBoardingModal/OnBoardingModal';
import PhotoModal from '../../../../components/specific/modal/photoModal/PhotoModal';
import PhotoGrid from '../../../../components/specific/photoGrid/PhotoGrid';
import { createGuestbookCardRoute } from '../../../../constants/routes';
import useGuestbookCard from '../../../../hooks/domain/guestbook/useGuestbookCard';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import { theme } from '../../../../styles/theme';
import type { Photo } from '../../../../types/photo.type';
import { calculatePrevNextId } from '../../../../utils/calculatePrevNextIndex';
import { parseTimestamp } from '../../../../utils/parseTimestamp';
import * as S from './GuestbookCardPage.styles';

const GuestbookCardPage = () => {
  const navigate = useNavigate();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [localPhotoList, setLocalPhotoList] = useState<Photo[]>([]);
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
  const photoListLength = localPhotoList.length;

  // guestbookCard.photos가 변경되면 localPhotoList를 업데이트
  useEffect(() => {
    setLocalPhotoList(guestbookCard.photos);
  }, [guestbookCard.photos]);

  const handlePreviousCardMove = () => {
    if (prevGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const handleNextCardMove = () => {
    if (nextGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, nextGuestbookId));
  };

  const handleModalClose = () => {
    setIsOnboardingOpen((prev) => !prev);
  };

  const handlePhotoModalClose = () => {
    setIsPhotoModalOpen(false);
  };

  const handlePhotoClick = (photo: Photo) => {
    const photoIndex = localPhotoList.findIndex((p) => p.id === photo.id);
    setSelectedPhotoIndex(photoIndex);
    setIsPhotoModalOpen(true);
  };

  const handlePhotoDelete = (photoId: number) => {
    setLocalPhotoList((prev) => prev.filter((photo) => photo.id !== photoId));

    if (localPhotoList.length === 1) {
      setIsPhotoModalOpen(false);
    }
  };

  return (
    <>
      <OnBoardingModal
        text={'스와이프하여 다음 방명록으로 이동'}
        icon={<MdSwipe />}
        isOpen={isOnboardingOpen}
        onClose={handleModalClose}
      />
      <Activity mode={isPhotoModalOpen ? 'visible' : 'hidden'}>
        <PhotoModal
          isOpen={isPhotoModalOpen}
          photoList={localPhotoList}
          initialPhotoIndex={selectedPhotoIndex}
          spaceCode={spaceCode}
          guestbookCardId={guestbookCardId}
          onClose={handlePhotoModalClose}
          onDelete={handlePhotoDelete}
        />
      </Activity>
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
            <PhotoGrid
              photoList={localPhotoList}
              onPhotoClick={handlePhotoClick}
            />
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
    </>
  );
};

export default GuestbookCardPage;
