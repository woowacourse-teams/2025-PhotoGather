import { useCallback, useEffect, useState } from 'react';
import {
  LeftwardArrowIcon,
  RightwardArrowIcon,
} from '../../../../@assets/icons';
import { DefaultImageImg as defaultImage } from '../../../../@assets/images';
import { photoService } from '../../../../apis/services/photo.service';
import { useOverlay } from '../../../../contexts/OverlayProvider';
import useSwipe from '../../../../hooks/@common/useSwipe';
import useTaskHandler from '../../../../hooks/@common/useTaskHandler';
import type { PreviewFile } from '../../../../types/file.type';
import type { BaseModalProps } from '../../../../types/modal.type';
import type { Photo } from '../../../../types/photo.type';
import { buildOriginalImageUrl } from '../../../../utils/buildImageUrl';
import { createImageErrorHandler } from '../../../../utils/createImageErrorHandler';
import { parseImagePath } from '../../../../utils/parsedImagePath';
import IconLabelButton from '../../buttons/iconLabelButton/IconLabelButton';
import ConfirmModal from '../confirmModal/ConfirmModal';
import * as S from './PhotoModal.styles';

interface BasePhotoModalProps extends BaseModalProps {
  /** 사진 삭제 함수 */
  onDelete?: (id: number) => void;
}

interface GuestPhotoModalProps extends BasePhotoModalProps {
  /** 모달 타입 */
  mode: 'guest';
  /** useFileUpload에서 받은 previewData */
  previewFile: PreviewFile;
}

interface ManagerPhotoModalProps extends BasePhotoModalProps {
  /** 모달 타입 */
  mode: 'manager';
  /** 사진 ID */
  photoId: number;
  /** 스페이스 코드 */
  spaceCode: string;
  /** 이전 사진 ID */
  prevPhotoId?: number | null;
  /** 다음 사진 ID */
  nextPhotoId?: number | null;
  /** 이전/다음 ID 가져오기 함수 */
  getNavigationIds?: (currentId: number) => {
    prevId: number | null;
    nextId: number | null;
  };
  /** 다운로드 핸들러 */
  onDownload?: () => void;
}

type PhotoModalProps = GuestPhotoModalProps | ManagerPhotoModalProps;

const PhotoModal = (props: PhotoModalProps) => {
  const { mode, onClose, onSubmit } = props;
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(
    mode === 'manager' ? props.photoId : null,
  );
  // TODO : 중복 상태 여부 확인 필요
  const [displayPath, setDisplayPath] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);
  const overlay = useOverlay();
  const { tryFetch } = useTaskHandler();
  // TODO : 모드별로 컴포넌트 분리 후 게스트일 때도 스와이프, 방향키 제어 가능하도록 리팩토링
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => isManagerMode && handleNextPhoto(),
    onSwipeRight: () => isManagerMode && handlePrevPhoto(),
    threshold: 50,
    debug: false,
  });

  const isManagerMode = mode === 'manager';
  const handleImageError = createImageErrorHandler(defaultImage);

  const managerPhotoId = mode === 'manager' ? props.photoId : undefined;
  const managerSpaceCode = mode === 'manager' ? props.spaceCode : undefined;

  const navigationIds =
    mode === 'manager' && props.getNavigationIds && currentPhotoId
      ? props.getNavigationIds(currentPhotoId)
      : {
          prevId: mode === 'manager' ? props.prevPhotoId || null : null,
          nextId: mode === 'manager' ? props.nextPhotoId || null : null,
        };

  const prevPhotoId = navigationIds.prevId;
  const nextPhotoId = navigationIds.nextId;

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 fetch
  useEffect(() => {
    if (isManagerMode) {
      fetchPhoto();
      return;
    }
    setDisplayPath(props.previewFile.previewUrl);
  }, []);

  const fetchPhoto = useCallback(
    async (photoId?: number) => {
      const targetPhotoId = photoId || managerPhotoId;

      await tryFetch({
        task: async () => {
          // TODO : 모달을 종류별로 분리
          if (!managerSpaceCode || !targetPhotoId) return;
          const response = await photoService.getById(
            managerSpaceCode,
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
    [managerPhotoId, managerSpaceCode, tryFetch],
  );

  const guestModeDelete = async () => {
    // TODO : 모달을 종류별로 분리 및 아래 if 분기점 삭제
    if (!props.onDelete) return;
    if (!('previewFile' in props)) return;

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

    props.onDelete(props.previewFile.id);
    onClose?.();
  };

  const managerModeDelete = async () => {
    if (!props.onDelete) return;
    if (!('photoId' in props)) return;
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

    props.onDelete(props.photoId);
    onClose?.();
  };

  const handleDelete = () => {
    if (isManagerMode) {
      managerModeDelete();
    } else {
      guestModeDelete();
    }
  };

  const handleDownload = () => {
    if (!('onDownload' in props)) return;
    if (!props.onDownload) return;

    props.onDownload();
    onSubmit?.(true);
  };

  const navigateToPhoto = useCallback(
    async (targetPhotoId: number | null) => {
      if (isNavigating || !targetPhotoId || !isManagerMode) return;

      setIsNavigating(true);

      await fetchPhoto(targetPhotoId);
      setIsNavigating(false);
    },
    [isNavigating, isManagerMode, fetchPhoto],
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

      if (isManagerMode) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleNextPhoto();
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handlePrevPhoto();
        }
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
      {isManagerMode && photo && (
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
        {isManagerMode && (
          <S.NavigationContainer>
            <S.NavigationButton
              type="button"
              $position="left"
              aria-label="다음 사진"
              disabled={!nextPhotoId || isNavigating}
              onPointerDown={handleNextPhoto}
            >
              <LeftwardArrowIcon />
            </S.NavigationButton>
            <S.NavigationButton
              type="button"
              $position="right"
              aria-label="이전 사진"
              disabled={!prevPhotoId || isNavigating}
              onPointerDown={handlePrevPhoto}
            >
              <RightwardArrowIcon />
            </S.NavigationButton>
          </S.NavigationContainer>
        )}
      </S.PhotoContainer>
      <S.ButtonContainer
        $isManagerMode={isManagerMode}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <IconLabelButton
          icon={<S.DeleteIcon />}
          variant="danger"
          onClick={handleDelete}
        />
        {isManagerMode && (
          <IconLabelButton
            icon={<S.DownloadIcon />}
            variant="dark"
            onClick={handleDownload}
          />
        )}
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default PhotoModal;
