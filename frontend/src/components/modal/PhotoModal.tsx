import type { BaseModalProps } from '../../types/modal.type';
import IconLabelButton from '../@common/buttons/iconLabelButton/IconLabelButton';
import * as S from './PhotoModal.styles';

type Mode = 'guest' | 'manager';

interface PhotoModalProps extends BaseModalProps {
  /** 사진 ID */
  photoId: number;
  /** 업로드한 사람 */
  uploaderName?: string;
  /** PhotoModal의 모드 */
  mode: Mode;
}

const PhotoModal = ({
  photoId,
  uploaderName = '알 수 없음',
  mode,
  onClose,
  onSubmit,
}: PhotoModalProps) => {
  const isManagerMode = mode === 'manager';

  const handleDelete = () => {
    onClose?.();
  };

  const handleDownload = () => {
    onSubmit?.(true);
  };

  return (
    <S.Wrapper>
      {isManagerMode && (
        <S.FromContainer>
          <S.FromMessage>From.</S.FromMessage>
          {uploaderName}
        </S.FromContainer>
      )}
      {/*{photo && (*/}
      <>
        <S.Photo></S.Photo>
      </>
      {/*)}*/}
      <S.ButtonContainer>
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
