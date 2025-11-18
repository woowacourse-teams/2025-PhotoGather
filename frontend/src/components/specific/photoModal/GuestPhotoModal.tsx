import { useEffect, useState } from 'react';
import { LeftwardArrowIcon, RightwardArrowIcon } from '../../../@assets/icons';
import { DefaultImageImg as defaultImage } from '../../../@assets/images';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useSwipe from '../../../hooks/@common/useSwipe';
import type { PreviewFile } from '../../../types/file.type';
import type { BaseModalProps } from '../../../types/modal.type';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import IconLabelButton from '../../@common/buttons/iconLabelButton/IconLabelButton';
import ConfirmModal from '../../@common/modal/confirmModal/ConfirmModal';
import * as S from './PhotoModal.styles';

interface BasePhotoModalProps extends BaseModalProps {
  /** 사진 삭제 함수 */
  onDelete?: (id: number) => void;
}

interface GuestPhotoModalProps extends BasePhotoModalProps {
  /** useFileUpload에서 받은 previewData 배열 */
  previewFiles: PreviewFile[];
  /** 현재 선택된 사진 ID */
  currentId: number;
}

const GuestPhotoModal = (props: GuestPhotoModalProps) => {
  const { onClose, onSubmit } = props;
  const [currentPhotoId, setCurrentPhotoId] = useState<number>(props.currentId);
  const overlay = useOverlay();

  const currentIndex = props.previewFiles.findIndex(
    (file) => file.id === currentPhotoId,
  );
  const currentFile = props.previewFiles[currentIndex];
  const displayPath = currentFile?.previewUrl || '';

  const prevPhotoId =
    currentIndex < props.previewFiles.length - 1
      ? props.previewFiles[currentIndex + 1].id
      : null;
  const nextPhotoId =
    currentIndex > 0 ? props.previewFiles[currentIndex - 1].id : null;

  const handlePrevPhoto = () => {
    if (prevPhotoId !== null) {
      setCurrentPhotoId(prevPhotoId);
    }
  };

  const handleNextPhoto = () => {
    if (nextPhotoId !== null) {
      setCurrentPhotoId(nextPhotoId);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => handleNextPhoto(),
    onSwipeRight: () => handlePrevPhoto(),
    threshold: 50,
    debug: false,
  });

  const handleImageError = createImageErrorHandler(defaultImage);

  const handleDelete = async () => {
    if (!props.onDelete) return;

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

    props.onDelete(currentPhotoId);
    onClose?.();
  };

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
  }, [onClose, prevPhotoId, nextPhotoId]);

  return (
    <S.Wrapper
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <S.PhotoContainer
        onMouseDown={(e) => e.stopPropagation()}
        {...swipeHandlers}
      >
        {displayPath ? (
          <S.Photo
            src={displayPath}
            alt="Image"
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
            disabled={nextPhotoId === null}
            onPointerDown={handleNextPhoto}
          >
            <LeftwardArrowIcon />
          </S.NavigationButton>
          <S.NavigationButton
            type="button"
            $position="right"
            aria-label="이전 사진"
            disabled={prevPhotoId === null}
            onPointerDown={handlePrevPhoto}
          >
            <RightwardArrowIcon />
          </S.NavigationButton>
        </S.NavigationContainer>
      </S.PhotoContainer>
      <S.GuestButtonContainer onMouseDown={(e) => e.stopPropagation()}>
        <IconLabelButton
          icon={<S.DeleteIcon />}
          variant="danger"
          onClick={handleDelete}
        />
      </S.GuestButtonContainer>
    </S.Wrapper>
  );
};

export default GuestPhotoModal;
