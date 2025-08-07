import rocketIcon from '@assets/images/rocket.png';
import { useEffect, useState } from 'react';
import { useOverlay } from '../../context/OverlayProvider';
import useApiCall from '../../hooks/@common/useApiCall';
import type { BaseModalProps } from '../../types/modal.type';
import type { Photo } from '../../types/photo.type';
import IconLabelButton from '../@common/buttons/iconLabelButton/IconLabelButton';
import LoadingLayout from '../layout/LoadingLayout/LoadingLayout';
import ConfirmModal from './ConfirmModal';
import * as S from './PhotoModal.styles';

type Mode = 'guest' | 'manager';

interface PhotoModalProps extends BaseModalProps {
  /** 사진 ID */
  photoId: number;
  /** 스페이스 코드 */
  spaceCode: string;
  /** 업로드한 사람 */
  uploaderName?: string;
  /** PhotoModal의 모드 */
  mode: Mode;
}

const PhotoModal = ({
  photoId,
  spaceCode,
  uploaderName = '알 수 없음',
  mode,
  onClose,
  onSubmit,
}: PhotoModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const { safeApiCall } = useApiCall();
  const overlay = useOverlay();

  const isManagerMode = mode === 'manager';

  const handleDelete = async () => {
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
        // 실제 삭제 로직
      }
    } catch (error) {
      console.error('모달 오류:', error);
    }
  };

  const handleDownload = () => {
    onSubmit?.(true);
  };

  if (isLoading) {
    return (
      <S.Wrapper>
        <LoadingLayout
          iconList={[
            { src: rocketIcon, alt: '로딩 아이콘' },
            { src: rocketIcon, alt: '로딩 아이콘' },
            { src: rocketIcon, alt: '로딩 아이콘' },
          ]}
          descriptionList={['로딩 설명', '로딩 설명', '로딩 설명']}
          percentage={0}
        />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      {isManagerMode && (
        <S.FromContainer>
          <S.FromMessage>From.</S.FromMessage>
          {uploaderName}
        </S.FromContainer>
      )}
      <S.Photo>
        <img
          src={photo?.path}
          alt={photo?.originalName || `ID: ${photo?.id}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </S.Photo>
      <S.ButtonContainer $isManagerMode={isManagerMode}>
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
