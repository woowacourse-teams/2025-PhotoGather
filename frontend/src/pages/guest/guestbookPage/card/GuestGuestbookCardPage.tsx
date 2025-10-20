import { Activity, useEffect, useState } from 'react';
import {
  MdArrowBack,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import IconButton from '../../../../components/@common/buttons/iconButton/IconButton';
import Line from '../../../../components/@common/line/Line';
import GuestPhotoModal from '../../../../components/specific/modal/guestPhotoModal/GuestPhotoModal';
import {
  createGuestGuestbookCardRoute,
  createGuestGuestbookRoute,
} from '../../../../constants/routes';
import useGuestbookCard from '../../../../hooks/domain/guestbook/useGuestbookCard';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import { theme } from '../../../../styles/theme';
import type { Photo } from '../../../../types/photo.type';
import { calculatePrevNextId } from '../../../../utils/calculatePrevNextIndex';
import { parseTimestamp } from '../../../../utils/parseTimestamp';
import * as S from './GuestGuestbookCardPage.styles';
import GuestbookCardInfoSection from './sections/GuestGuestbookCardInfoSection';
import GuestbookCardMessageSection from './sections/GuestGuestbookCardMessageSection';
import GuestGuestbookCardPhotoSection from './sections/GuestGuestbookCardPhotoSection';

const GuestGuestbookCardPage = () => {
  const navigate = useNavigate();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [localPhotoList, setLocalPhotoList] = useState<Photo[]>([]);
  const { spaceCode = '', guestbookCardId = '' } = useParams();
  const { guestbookCard, isFetching: isGuestbookCardFetching } =
    useGuestbookCard({ spaceCode, guestbookCardId });
  const { guestbookList, fetchNextPage } = useGuestbookList(spaceCode);
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
    navigate(createGuestGuestbookRoute(spaceCode));
  };

  useEffect(() => {
    setLocalPhotoList(guestbookCard.photos);
  }, [guestbookCard.photos]);

  const handlePreviousCardMove = () => {
    const { prevId: prevGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    if (prevGuestbookId === null) return;
    navigate(createGuestGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const handleNextCardMove = () => {
    const { nextId: nextGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    if (nextGuestbookId === null) return;
    navigate(createGuestGuestbookCardRoute(spaceCode, nextGuestbookId));
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIdIndex에만 의존
  useEffect(() => {
    if (guestbookList.length - currentIdIndex <= 3) fetchNextPage();
  }, [currentIdIndex]);

  return (
    <S.Wrapper>
      <Activity mode={isPhotoModalOpen ? 'visible' : 'hidden'}>
        <GuestPhotoModal
          isOpen={isPhotoModalOpen}
          photoList={localPhotoList}
          initialPhotoIndex={selectedPhotoIndex}
          spaceCode={spaceCode}
          guestbookCardId={guestbookCardId}
          onClose={handlePhotoModalClose}
          onDelete={handlePhotoDelete}
        />
      </Activity>
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
      </S.DeleteButtonContainer>
      <GuestbookCardInfoSection
        guestbookCard={guestbookCard}
        photoListLength={photoListLength}
        createdTimeDescription={createdTimeDescription}
        isGuestbookCardFetching={isGuestbookCardFetching}
      />
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
      <GuestbookCardMessageSection
        guestbookCard={guestbookCard}
        isGuestbookCardFetching={isGuestbookCardFetching}
      />
      <GuestGuestbookCardPhotoSection
        photoList={localPhotoList}
        onPhotoClick={handlePhotoClick}
        isGuestbookCardFetching={isGuestbookCardFetching}
      />
      <Line width={192} />
    </S.Wrapper>
  );
};

export default GuestGuestbookCardPage;
