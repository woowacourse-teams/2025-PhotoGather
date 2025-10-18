import { Activity, useEffect, useState } from 'react';
import {
  MdArrowBack,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlinePhoto,
  MdSwipe,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import IconButton from '../../../../components/@common/buttons/iconButton/IconButton';
import Line from '../../../../components/@common/line/Line';
import DeleteModal from '../../../../components/@common/modal/deleteModal/DeleteModal';
import OnBoardingModal from '../../../../components/specific/modal/onBoardingModal/OnBoardingModal';
import PhotoModal from '../../../../components/specific/modal/photoModal/PhotoModal';
import PhotoGrid from '../../../../components/specific/photoGrid/PhotoGrid';
import { CONSTRAINTS } from '../../../../constants/constraints';
import {
  createGuestbookCardRoute,
  createGuestbookRoute,
} from '../../../../constants/routes';
import useSwipeElement from '../../../../hooks/@common/useSwipeElement';
import useGuestbookCard from '../../../../hooks/domain/guestbook/useGuestbookCard';
import useGuestbookDelete from '../../../../hooks/domain/guestbook/useGuestbookDelete';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import { theme } from '../../../../styles/theme';
import type { Photo } from '../../../../types/photo.type';
import { calculatePrevNextId } from '../../../../utils/calculatePrevNextIndex';
import { parseTimestamp } from '../../../../utils/parseTimestamp';
import * as S from './GuestbookCardPage.styles';

const GuestbookCardPage = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [localPhotoList, setLocalPhotoList] = useState<Photo[]>([]);
  const { spaceCode = '', guestbookCardId = '' } = useParams();
  const { guestbookCard } = useGuestbookCard({ spaceCode, guestbookCardId });
  const { guestbookList, fetchNextPage } = useGuestbookList(spaceCode);
  const { mutateAsync, isPending } = useGuestbookDelete(
    spaceCode,
    guestbookCardId,
  );
  const guestbookCardIdList = guestbookList.map(
    (guestbookCard) => guestbookCard.id,
  );
  const { prevId: prevGuestbookId, nextId: nextGuestbookId } =
    calculatePrevNextId(guestbookCardIdList, guestbookCard.id);
  const { year, month, day, hour, minute } = parseTimestamp(
    guestbookCard.createdAt,
  );
  const createdTimeDescription = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  const photoListLength = localPhotoList.length;
  const currentIdIndex = guestbookCardIdList.indexOf(guestbookCard.id);

  const handleBackMove = () => {
    navigate(createGuestbookRoute(spaceCode));
  };

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

  const handleDelete = async () => {
    await mutateAsync();
    setIsDeleteModalOpen(false);
    if (prevGuestbookId === null) navigate(createGuestbookRoute(spaceCode));
    else navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const { handleTouchStart, handleTouchEnd, handleTouchCancel } =
    useSwipeElement({
      onLeftToRight: handlePreviousCardMove,
      onRightToLeft: handleNextCardMove,
      swipeDistance: CONSTRAINTS.GUEST_BOOK_CARD_SWIPE_DISTANCE,
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIdIndex에만 의존
  useEffect(() => {
    if (guestbookList.length - currentIdIndex <= 3) fetchNextPage();
  }, [currentIdIndex]);

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => {
          setIsDeleteModalOpen(false);
        }}
        onDelete={handleDelete}
        buttonDisabled={isPending}
      />
      <OnBoardingModal
        text={'스와이프하여 다음 방명록으로 이동'}
        icon={<MdSwipe />}
        isOpen={isOnboardingOpen}
        onClose={handleModalClose}
      />
      <PhotoModal
        isOpen={isPhotoModalOpen}
        photoList={localPhotoList}
        initialPhotoIndex={selectedPhotoIndex}
        spaceCode={spaceCode}
        guestbookCardId={guestbookCardId}
        onClose={handlePhotoModalClose}
        onDelete={handlePhotoDelete}
      />
      <S.Wrapper
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <S.DeleteButtonContainer>
          <Button
            type="button"
            variant="fit"
            text={
              <>
                <MdArrowBack />
                <p>목록</p>
              </>
            }
            onClick={handleBackMove}
          />
          <Button
            type="button"
            variant="error"
            text="삭제"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          />
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
                size="small"
              />
            )
          }
          rightElement={
            nextGuestbookId && (
              <IconButton
                onClick={handleNextCardMove}
                icon={<MdArrowForwardIos color={theme.colors.gray04} />}
                variant="default"
                size="small"
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
              variant="tertiary"
              text="사진 전체 다운로드"
            />
          </S.PhotoSection>
        )}
        <Line width={192} />
      </S.Wrapper>
    </>
  );
};

export default GuestbookCardPage;
