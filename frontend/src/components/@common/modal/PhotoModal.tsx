import { useCallback, useEffect, useState } from 'react';
import defaultImage from '../../@assets/images/default_image.png';
import { photoService } from '../../../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../../../constants/debugMessages';
import { NETWORK } from '../../../constants/errors';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useApiCall from '../../../hooks/@common/useApiCall';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import * as S from './PhotoModal.styles';
import {BaseModalProps} from "../../../types/modal.type";
import {PreviewFile} from "../../../types/file.type";
import {Photo} from "../../../types/photo.type";
import {createImageErrorHandler} from "../../../utils/createImageErrorHandler";
import ConfirmModal from "./confirmModal/ConfirmModal";
import IconLabelButton from "../buttons/iconLabelButton/IconLabelButton";

// Guest mode props - previewData 사용
interface GuestPhotoModalProps extends BaseModalProps {
  /** 모달 타입 */
  mode: 'guest';
  /** useFileUpload에서 받은 previewData */
  previewFile: PreviewFile;
  /** 삭제 핸들러 */
  onDelete?: (id: number) => void;
}

// Manager mode props - API 호출
interface ManagerPhotoModalProps extends BaseModalProps {
  /** 모달 타입 */
  mode: 'manager';
  /** 사진 ID */
  photoId: number;
  /** 스페이스 코드 */
  spaceCode: string;
  /** 업로드한 사람 */
  uploaderName?: string;
  /** 다운로드 핸들러 */
  onDownload?: () => void;
  /** 삭제 핸들러 */
  onDelete?: () => undefined | Promise<boolean>;
}

type PhotoModalProps = GuestPhotoModalProps | ManagerPhotoModalProps;

const PhotoModal = (props: PhotoModalProps) => {
  const { mode, onClose, onSubmit } = props;
  const [, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [displayPath, setDisplayPath] = useState<string>('');
  const { safeApiCall } = useApiCall();
  const overlay = useOverlay();

  const isManagerMode = mode === 'manager';
  const handleImageError = createImageErrorHandler(defaultImage);

  const managerPhotoId = mode === 'manager' ? props.photoId : undefined;
  const managerSpaceCode = mode === 'manager' ? props.spaceCode : undefined;

  const fetchPhoto = useCallback(async () => {
    if (mode !== 'manager' || !managerSpaceCode || !managerPhotoId) return;

    setIsLoading(true);

    try {
      const response = await safeApiCall(() =>
        photoService.getById(managerSpaceCode, managerPhotoId),
      );

      if (response.success && response.data) {
        const data = response.data;

        if (!data) {
          console.warn(DEBUG_MESSAGES.NO_RESPONSE);
          return;
        }

        setPhoto(data);

        // API에서 받은 path를 전체 URL로 변환
        // parsedImagePath를 사용하여 파일명 추출 (확장자 제외)
        let imageUrl = '';

        if (data.path) {
          const fileName = data.path;
          if (fileName) {
            imageUrl = buildOriginalImageUrl(managerSpaceCode, fileName);
          } else {
            console.error('❌ Failed to parse image path:', data.path);
          }
        }
        setDisplayPath(imageUrl);
      } else {
        console.error('API call failed:', response);
        if (
          !response.error?.toLowerCase().includes(NETWORK.DEFAULT.toLowerCase())
        ) {
          console.error('사진을 불러오는데 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('💥 Photo fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [mode, managerPhotoId, managerSpaceCode, safeApiCall]);

  const guestPreviewPath =
    mode === 'guest' ? props.previewFile.path : undefined;

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchPhoto는 useCallback으로 메모이제이션되어 있지만, 의존성에 추가하면 manager mode에서 불필요한 재호출이 발생할 수 있음
  useEffect(() => {
    if (mode === 'guest' && guestPreviewPath) {
      setDisplayPath(guestPreviewPath);
    } else if (mode === 'manager') {
      fetchPhoto();
    }
  }, [mode, guestPreviewPath]);

  const handleDelete = async () => {
    if (mode === 'guest' && props.onDelete) {
      try {
        const result = await overlay(
          <ConfirmModal
            description="정말 삭제하시겠어요?"
            confirmText="삭제"
            cancelText="취소"
          />,
          {
            clickOverlayClose: true,
          },
        );

        if (result) {
          props.onDelete(props.previewFile.id);
          onClose?.();
        }
      } catch (error) {
        console.error('모달 오류:', error);
      }
    } else if (mode === 'manager' && props.onDelete) {
      const result = await props.onDelete();
      if (result) {
        onClose?.();
      }
    }
  };

  const handleDownload = () => {
    if (mode === 'manager' && props.onDownload) {
      props.onDownload();
    }
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
      {isManagerMode && 'uploaderName' in props && (
        <S.FromContainer onMouseDown={(e) => e.stopPropagation()}>
          <S.FromMessage>From.</S.FromMessage>
          {props.uploaderName || '익명의 우주여행자'}
        </S.FromContainer>
      )}
      <S.PhotoContainer onMouseDown={(e) => e.stopPropagation()}>
        {displayPath ? (
          <S.Photo
            src={displayPath}
            alt={photo?.originalName || 'Image'}
            onError={handleImageError}
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
