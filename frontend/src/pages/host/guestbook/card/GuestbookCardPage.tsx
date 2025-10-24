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
import DeleteModal from '../../../../components/@common/modal/deleteModal/DeleteModal';
import PhotoModal from '../../../../components/specific/modal/photoModal/PhotoModal';
import {
  createGuestbookCardRoute,
  createGuestbookRoute,
} from '../../../../constants/routes';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useGuestbookCard from '../../../../hooks/domain/guestbook/useGuestbookCard';
import useGuestbookDelete from '../../../../hooks/domain/guestbook/useGuestbookDelete';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import { theme } from '../../../../styles/theme';
import type { Photo } from '../../../../types/photo.type';
import { calculatePrevNextId } from '../../../../utils/calculatePrevNextIndex';
import { parseTimestamp } from '../../../../utils/parseTimestamp';
import * as S from './GuestbookCardPage.styles';
import GuestbookCardInfoSection from './sections/GuestbookCardInfoSection';
import GuestbookCardMessageSection from './sections/GuestbookCardMessageSection';
import GuestbookCardPhotoSection from './sections/GuestbookCardPhotoSection';

const GuestbookCardPage = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [localPhotoList, setLocalPhotoList] = useState<Photo[]>([]);
  const { spaceCode = '', guestbookCardId = '' } = useParams();
  const { guestbookCard, isFetching: isGuestbookCardFetching } =
    useGuestbookCard({ spaceCode, guestbookCardId });
  const { guestbookList, fetchNextPage } = useGuestbookList(spaceCode);
  const { mutateAsync, isPending } = useGuestbookDelete(
    spaceCode,
    guestbookCardId,
  );
  const { trackClick } = useButtonTracking({ userType: 'host', spaceCode });
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
    trackClick('guestbook_card_back_button', {
      hasPhoto: guestbookCard.photos.length > 0,
    });
    navigate(createGuestbookRoute(spaceCode));
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
    trackClick('guestbook_card_previous_button', {
      hasPhoto: guestbookCard.photos.length > 0,
    });
    navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const handleNextCardMove = () => {
    const { nextId: nextGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    if (nextGuestbookId === null) return;
    trackClick('guestbook_card_next_button', {
      hasPhoto: guestbookCard.photos.length > 0,
    });
    navigate(createGuestbookCardRoute(spaceCode, nextGuestbookId));
  };

  const handlePhotoModalClose = () => {
    trackClick('guestbook_card_photo_modal_close', {
      photoLength: guestbookCard.photos.length,
    });
    setIsPhotoModalOpen(false);
  };

  const handlePhotoClick = (photo: Photo) => {
    trackClick('guestbook_card_photo_click', {
      photoLength: guestbookCard.photos.length,
      currentPhotoId: guestbookCard.photos.indexOf(photo) + 1,
    });
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
    const { prevId: prevGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    trackClick('confirm_guestbook_card_delete_modal', {
      hasPhoto: guestbookCard.photos.length > 0,
    });
    await mutateAsync();
    setIsDeleteModalOpen(false);
    if (prevGuestbookId === null) navigate(createGuestbookRoute(spaceCode));
    else navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIdIndex에만 의존
  useEffect(() => {
    if (guestbookList.length - currentIdIndex <= 3) fetchNextPage();
  }, [currentIdIndex]);

  const handleDeleteButton = () => {
    trackClick('open_guestbook_card_delete_modal', {
      hasPhoto: guestbookCard.photos.length > 0,
    });
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => {
          trackClick('close_guestbook_card_delete', {
            hasPhoto: guestbookCard.photos.length > 0,
          });
          setIsDeleteModalOpen(false);
        }}
        onDelete={handleDelete}
        buttonDisabled={isPending}
      />
      <S.Wrapper>
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
            onClick={handleDeleteButton}
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
        <GuestbookCardPhotoSection
          photoList={localPhotoList}
          onPhotoClick={handlePhotoClick}
          isGuestbookCardFetching={isGuestbookCardFetching}
          guestbookTitle={`${guestbookCard.nickname}의 방명록 사진`}
        />
        {/* <Line width={192} /> */}
      </S.Wrapper>
    </>
  );
};

export default GuestbookCardPage;
