import { Activity, useEffect, useState } from 'react';
import {
  MdArrowBack,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlinePhoto,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import IconButton from '../../../../components/@common/buttons/iconButton/IconButton';
import Line from '../../../../components/@common/line/Line';
import DeleteModal from '../../../../components/@common/modal/deleteModal/DeleteModal';
import PhotoModal from '../../../../components/specific/modal/photoModal/PhotoModal';
import PhotoGrid from '../../../../components/specific/photoGrid/PhotoGrid';
import {
  createGuestbookCardRoute,
  createGuestbookRoute,
} from '../../../../constants/routes';
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

  // guestbookCard.photos가 변경되면 localPhotoList를 업데이트
  useEffect(() => {
    setLocalPhotoList(guestbookCard.photos);
  }, [guestbookCard.photos]);

  const handlePreviousCardMove = () => {
    const { prevId: prevGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    if (prevGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

  const handleNextCardMove = () => {
    const { nextId: nextGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    if (nextGuestbookId === null) return;
    navigate(createGuestbookCardRoute(spaceCode, nextGuestbookId));
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
    const { prevId: prevGuestbookId } = calculatePrevNextId(
      guestbookCardIdList,
      guestbookCard.id,
    );
    await mutateAsync();
    setIsDeleteModalOpen(false);
    if (prevGuestbookId === null) navigate(createGuestbookRoute(spaceCode));
    else navigate(createGuestbookCardRoute(spaceCode, prevGuestbookId));
  };

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
