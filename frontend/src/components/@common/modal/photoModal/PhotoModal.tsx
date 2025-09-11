import defaultImage from '@assets/images/default_image.png';
import { useEffect, useState } from 'react';
import { photoService } from '../../../../apis/services/photo.service';
import { useOverlay } from '../../../../contexts/OverlayProvider';
import useTaskHandler from '../../../../hooks/@common/useTaskHandler';
import type { PreviewFile } from '../../../../types/file.type';
import type { BaseModalProps } from '../../../../types/modal.type';
import type { Photo } from '../../../../types/photo.type';
import { buildOriginalImageUrl } from '../../../../utils/buildImageUrl';
import { createImageErrorHandler } from '../../../../utils/createImageErrorHandler';
import IconLabelButton from '../../buttons/iconLabelButton/IconLabelButton';
import ConfirmModal from '../confirmModal/ConfirmModal';
import * as S from './PhotoModal.styles';

interface BasePhotoModalProps extends BaseModalProps {
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
  /** 다운로드 핸들러 */
  onDownload?: () => void;
}

type PhotoModalProps = GuestPhotoModalProps | ManagerPhotoModalProps;

const PhotoModal = (props: PhotoModalProps) => {
  const { mode, onClose, onSubmit } = props;
  const [, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);
  // TODO : 중복 상태 여부 확인 필요
  const [displayPath, setDisplayPath] = useState<string>('');
  const overlay = useOverlay();
  const { tryFetch } = useTaskHandler();

  const isManagerMode = mode === 'manager';
  const handleImageError = createImageErrorHandler(defaultImage);

  const managerPhotoId = mode === 'manager' ? props.photoId : undefined;
  const managerSpaceCode = mode === 'manager' ? props.spaceCode : undefined;

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 fetch
  useEffect(() => {
    if (isManagerMode) {
      fetchPhoto();
      return;
    }
    setDisplayPath(props.previewFile.previewUrl);
  }, []);

  const fetchPhoto = async () => {
    await tryFetch({
      task: async () => {
        setIsLoading(true);
        // TODO : 모달을 종류별로 분리
        if (!managerSpaceCode || !managerPhotoId) return;
        const response = await photoService.getById(
          managerSpaceCode,
          managerPhotoId,
        );

        if (!response || !response.data) return;
        const data = response.data;
        setPhoto(data);
        setDisplayPath(buildOriginalImageUrl(data.path));
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '사진을 불러오는데 실패했어요. 다시 시도해주세요.',
        },
      },
      onFinally: () => {
        setIsLoading(false);
      },
    });
  };

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
      <S.PhotoContainer onMouseDown={(e) => e.stopPropagation()}>
        {displayPath ? (
          <S.Photo
            src={displayPath}
            alt={photo?.originalName || 'Image'}
            onError={handleImageError}
            className="clarity-mask-photo"
          />
        ) : (
          <S.LoadingPhoto />
        )}
      </S.PhotoContainer>
      <S.ButtonContainer
        $isManagerMode={isManagerMode}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <IconLabelButton
          icon={<S.DeleteIcon />}
          variant="dark"
          onClick={handleDelete}
        />
        {isManagerMode && (
          <IconLabelButton
            icon={<S.DownloadIcon />}
            variant="light"
            onClick={handleDownload}
          />
        )}
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default PhotoModal;
