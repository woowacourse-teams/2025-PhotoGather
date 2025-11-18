import { useCallback, useEffect, useState } from 'react';
import { LeftwardArrowIcon, RightwardArrowIcon } from '../../../@assets/icons';
import { DefaultImageImg as defaultImage } from '../../../@assets/images';
import { photoService } from '../../../apis/services/photo.service';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useSwipe from '../../../hooks/@common/useSwipe';
import useTaskHandler from '../../../hooks/@common/useTaskHandler';
import type { BaseModalProps } from '../../../types/modal.type';
import type { Photo } from '../../../types/photo.type';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import { parseImagePath } from '../../../utils/parsedImagePath';
import IconLabelButton from '../../@common/buttons/iconLabelButton/IconLabelButton';
import ConfirmModal from '../../@common/modal/confirmModal/ConfirmModal';
import * as S from './PhotoModal.styles';

interface BasePhotoModalProps extends BaseModalProps {
  /** 사진 삭제 함수 */
  onDelete?: (id: number) => void;
}

interface ManagerPhotoModalProps extends BasePhotoModalProps {
  /** 사진 ID */
  photoId: number;
  /** 스페이스 코드 */
  spaceCode: string;
  /** 이전/다음 ID 가져오기 함수 */
  getNavigationIds: (currentId: number) => {
    prevId: number | null;
    nextId: number | null;
  };
  /** 다운로드 핸들러 */
  onDownload?: (id: number) => void;
}

const ManagerPhotoModal = (props: ManagerPhotoModalProps) => {
  const { onClose, onSubmit } = props;
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(
    props.photoId,
  );
  const [displayPath, setDisplayPath] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);
  const overlay = useOverlay();
  const { tryFetch } = useTaskHandler();

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => handleNextPhoto(),
    onSwipeRight: () => handlePrevPhoto(),
    threshold: 50,
    debug: false,
  });

  const handleImageError = createImageErrorHandler(defaultImage);

  const navigationIds = props.getNavigationIds(currentPhotoId ?? props.photoId);

  const prevPhotoId = navigationIds.prevId;
  const nextPhotoId = navigationIds.nextId;

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 fetch
  useEffect(() => {
    fetchPhoto();
  }, []);

  const fetchPhoto = useCallback(
    async (photoId?: number) => {
      const targetPhotoId = photoId || props.photoId;

      await tryFetch({
        task: async () => {
          if (!props.spaceCode || !targetPhotoId) return;
          const response = await photoService.getById(
            props.spaceCode,
            targetPhotoId,
          );

          if (!response || !response.data) return;
          const data = response.data;
          setPhoto(data);
          setCurrentPhotoId(data.id);
          const parsedPath = parseImagePath(data.path);
          setDisplayPath(buildOriginalImageUrl(parsedPath));
        },
        errorActions: ['toast'],
        context: {
          toast: {
            text: '사진을 불러오는데 실패했어요. 다시 시도해주세요.',
          },
        },
      });
    },
    [props.photoId, props.spaceCode, tryFetch],
  );

  const handleDelete = async () => {
    if (!props.onDelete) return;
    // TODO : usePhotosDelete로 모달 로직 이동
    const confirmResult = await overlay(
      <ConfirmModal
        title="정말 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onClose={onClose}
        onSubmit={onSubmit}
      />,
      {
        clickOverlayClose: true,
      },
    );
    if (!confirmResult) return;
    if (!currentPhotoId) return;

    props.onDelete(currentPhotoId);
    onClose?.();
  };

  const handleDownload = () => {
    if (!props.onDownload || !currentPhotoId) return;

    props.onDownload(currentPhotoId);
    onSubmit?.(true);
  };

  const navigateToPhoto = useCallback(
    async (targetPhotoId: number | null) => {
      if (isNavigating || !targetPhotoId) return;

      setIsNavigating(true);

      setCurrentPhotoId(targetPhotoId);
      setDisplayPath('');

      await fetchPhoto(targetPhotoId);
      setIsNavigating(false);
    },
    [isNavigating, fetchPhoto],
  );

  const handlePrevPhoto = useCallback(async () => {
    await navigateToPhoto(prevPhotoId);
  }, [prevPhotoId, navigateToPhoto]);

  const handleNextPhoto = useCallback(async () => {
    await navigateToPhoto(nextPhotoId);
  }, [nextPhotoId, navigateToPhoto]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 키보드 이벤트 무한 루프 방지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleNextPhoto();
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, prevPhotoId, nextPhotoId, handlePrevPhoto, handleNextPhoto]);

  return (
    <S.Wrapper
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      {photo && (
        <S.FromContainer onMouseDown={(e) => e.stopPropagation()}>
          <S.FromMessage>From.</S.FromMessage>
          {photo.guest.name ?? '익명의 우주여행자'}
        </S.FromContainer>
      )}
      <S.PhotoContainer
        onMouseDown={(e) => e.stopPropagation()}
        {...swipeHandlers}
      >
        {displayPath ? (
          <S.Photo
            src={displayPath}
            alt={photo?.originalName || 'Image'}
            onError={handleImageError}
            className="clarity-mask-photo"
            loading="lazy"
            fetchPriority="high"
          />
        ) : (
          <S.LoadingPhoto />
        )}
        <S.NavigationContainer>
          <S.NavigationButton
            type="button"
            $position="left"
            aria-label="다음 사진"
            disabled={nextPhotoId === null || isNavigating}
            onPointerDown={handleNextPhoto}
          >
            <LeftwardArrowIcon />
          </S.NavigationButton>
          <S.NavigationButton
            type="button"
            $position="right"
            aria-label="이전 사진"
            disabled={prevPhotoId === null || isNavigating}
            onPointerDown={handlePrevPhoto}
          >
            <RightwardArrowIcon />
          </S.NavigationButton>
        </S.NavigationContainer>
      </S.PhotoContainer>
      <S.ManagerButtonContainer onMouseDown={(e) => e.stopPropagation()}>
        <IconLabelButton
          icon={<S.DeleteIcon />}
          variant="danger"
          onClick={handleDelete}
        />
        <IconLabelButton
          icon={<S.DownloadIcon />}
          variant="dark"
          onClick={handleDownload}
        />
      </S.ManagerButtonContainer>
    </S.Wrapper>
  );
};

export default ManagerPhotoModal;
